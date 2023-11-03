const mongoose = require('mongoose');
const abuseProfileSchema = new mongoose.Schema(
  {
    profileLink: { type: String, required: true },
    categories: { type: Array, required: true },
    comment: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // name: { type: String, required: true },
    // question: { type: String },
    // description: { type: String, required: true },
    // difficulty: { type: Number, required: true },
    // topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    // position: { type: Number, required: true },
    // approved: { type: Boolean, default: false, required: true },
    // hint: { type: String },
    // attempts: { type: Number, default: 0 },
    // imgUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const AbuseProfile = mongoose.model('AbuseProfile', abuseProfileSchema);

module.exports = AbuseProfile;
