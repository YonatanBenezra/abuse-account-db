// Required modules
const crypto = require('crypto'); // Core module for cryptographic operations
const { promisify } = require('util'); // Utility module for promisifying functions
const jwt = require('jsonwebtoken'); // JSON Web Token (JWT) library
const User = require('../models/userModel'); // User model from the data layer
const AppError = require('../utils/appError'); // Custom error handling utility
const catchAsync = require('../utils/catchAsync'); // Async error handler utility
const Email = require('../utils/email'); // Utility for sending emails

// Function to sign JWT token
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Function to create and send JWT token to the client
const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Signup route controller
exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  const url = `${req.protocol}://${req.get('host')}/me`;
  // await new Email(newUser, url).sendWelcome();
  createAndSendToken(newUser, 201, res);
});

// Login with Social Media route controller
exports.loginWithSocialMedia = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  /* If the user exists, then send the JWT token. If not, create a new user. */
  if (user) {
    createAndSendToken(user, 200, res);
  } else {
    const newUser = await User.create({ ...req.body, verified: true });
    const url = `${req.protocol}://${req.get('host')}/me`;
    // await new Email(newUser, url).sendWelcome();
    createAndSendToken(newUser, 201, res);
  }
});

// Login route controller
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password)
    return next(new AppError('Please provide an email and password!', 400));

  // 2) Check if email and password are correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // 3) If all is okay, send the token to the client
  createAndSendToken(user, 200, res);
});

// Logout route controller
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

// Middleware to protect routes
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) Get the token and check if it's present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // 2) Verify the token
  if (!token)
    return next(
      new AppError(
        'You are not logged in. Please log in to access this resource',
        401
      )
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if the user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError('The user associated with this token no longer exists', 401)
    );

  // 4) Check if the user changed the password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed the password. Please log in again',
        401
      )
    );
  }

  // Grant access to the protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Middleware to restrict access based on user roles
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };

exports.protectAndRestrictTo = (role) =>
  catchAsync(async (req, res, next) => {
    // First run the protect middleware
    await exports.protect(req, res, (err) => {
      if (err) return next(err);
    });

    // If protect middleware passes, then run the restrictTo middleware
    exports.restrictTo(role)(req, res, next);
  });

// Forgot Password route controller
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get the user based on the POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('No user found with this email address', 404));
  }

  // 2) Generate a random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Please try again later!',
        500
      )
    );
  }
});

// Reset Password route controller
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get the user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If the token is valid and has not expired, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // 3) Update the changedPasswordAt property for the user
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // 4) Log the user in and send the JWT
  await user.save();
  createAndSendToken(user, 200, res);
});

// Update Password route controller
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get the user from the collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if the current password provided is correct
  const { passwordCurrent, password, passwordConfirm } = req.body;
  if (!(await user.correctPassword(passwordCurrent, user.password))) {
    return next(new AppError('Your current password is incorrect', 401));
  }

  // 3) If so, update the password
  user.password = password;
  user.passwordConfirm = passwordConfirm;

  await user.save();

  // 4) Log the user in and send the JWT
  createAndSendToken(user, 200, res);
});
