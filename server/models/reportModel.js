const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema(
  {
    categories: [{ type: String }], // Array of strings for categories
    comment: { type: String },
    linkToPost: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
    abuseProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'AbuseProfile' }, // Reference to the AbuseProfile model
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields for the abuse profile document
  }
);
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
