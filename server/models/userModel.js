// Import required modules and packages
const crypto = require('crypto'); // For cryptographic operations
const moment = require('moment'); // For date and time manipulation
const schedule = require('node-schedule'); // For scheduling tasks
const mongoose = require('mongoose'); // For interacting with MongoDB
const validator = require('validator'); // For validating data
const bcrypt = require('bcryptjs'); // For password hashing

// Define the User schema for MongoDB
const userSchema = new mongoose.Schema({
  // User's name
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  // User's email
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  // User's profile photo URL
  photo: {
    type: String,
    default: 'https://shorturl.at/hO568',
  },
  // User's role (admin or user)
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  // User's password (hashed and not selected by default)
  password: {
    type: String,
    select: false,
  },
  // User's password confirmation
  passwordConfirm: {
    type: String,
  },
  // Timestamp of the last password change
  passwordChangedAt: Date,
  // Token for resetting the password
  passwordResetToken: String,
  // Expiry date for the password reset token
  passwordResetExpires: Date,
  // User's account status (active by default, not selected by default)
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  // IDs of finished exercises associated with the user
  finishedExercises: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  ],
  // Count of consecutive days the user has coded
  codeStrike: {
    type: Number,
    default: 0,
  },
  // Date of the user's last coding activity
  lastCodedDate: {
    type: Date,
  },
});

// Middleware: Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Method: Check if the provided password matches the user's password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Method: Check if the user changed their password after a specific timestamp
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

// Method: Create a password reset token and set its expiration time
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Middleware: Filter out inactive users in find operations
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Create the User model using the User schema
const User = mongoose.model('User', userSchema);

// Function: Update the codeStrike for users based on their coding activity
const updateUserStrike = async () => {
  try {
    // Get all users from the database
    const users = await User.find();

    // Iterate through each user and update their codeStrike
    users.forEach(async (user) => {
      // If user has never coded, skip
      if (!user.lastCodedDate) return;

      const lastCodedDate = moment(user.lastCodedDate);
      const currentDate = moment();

      // Calculate the difference in days between last coded date and current date
      const dayDifference = currentDate.diff(lastCodedDate, 'days');

      if (dayDifference === 1) {
        // User coded yesterday, increment codeStrike
        user.codeStrike += 1;
      } else if (dayDifference > 1) {
        // User didn't code yesterday, reset codeStrike
        user.codeStrike = 0;
      }
      await user.save(); // Save the updated user data
    });
  } catch (error) {
    console.error('Error updating codeStrike:', error);
  }
};

// Schedule a daily task to update user codeStrike values
schedule.scheduleJob('1 0 * * *', updateUserStrike);

// Export the User model
module.exports = User;
