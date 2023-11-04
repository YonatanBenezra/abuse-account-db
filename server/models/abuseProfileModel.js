const mongoose = require('mongoose');

const abuseProfileSchema = new mongoose.Schema(
  {
    profileLink: { type: String, required: true, unique: true },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields for the abuse profile document
  }
);

const AbuseProfile = mongoose.model('AbuseProfile', abuseProfileSchema);

module.exports = AbuseProfile;
