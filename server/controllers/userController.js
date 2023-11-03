const moment = require('moment');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('./handlerFactory');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword',
        400
      )
    );
  }

  // 2) Sanitize fields
  const { name, email, photo, lastCodedDate, finishedExercise } = req.body;
  const updateData = { name, email, photo };

  // 3) Find the user
  const user = await User.findById(req.user.id);

  // Throw error if user not found
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  // 4) Add the finishedExercise to the array if it doesn't already exist
  if (finishedExercise && !user.finishedExercises.includes(finishedExercise)) {
    updateData.finishedExercises = [
      ...user.finishedExercises,
      finishedExercise,
    ];
  }
  //5) Update lastCodedDate
  if (lastCodedDate) {
    updateData.lastCodedDate = moment();
  }
  // 6) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'finishedExercises',
    populate: {
      path: 'topic',
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = handlerFactory.createOne(User);
exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User, {
  path: 'finishedExercises',
  populate: {
    path: 'topic',
  },
});
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
