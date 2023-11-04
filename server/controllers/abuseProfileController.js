const AbuseProfile = require('../models/abuseProfileModel'); // Assuming this is the file path
const Report = require('../models/reportModel'); // Assuming this is the file path
const handlerFactory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createOrUpdateProfile = catchAsync(async (req, res, next) => {
  const { profileLink, categories, comment, uploadedBy, linkToPost } = req.body;

  // Find the abuse profile or create a new one if it doesn't exist

  let abuseProfile = await AbuseProfile.findOne(
    { profileLink: profileLink },
    {},
    { new: true, upsert: true, runValidators: true }
  );
  if (!abuseProfile) {
    abuseProfile = await AbuseProfile.create({ profileLink: profileLink });
  }
  const report = await Report.create({
    categories: categories,
    comment: comment,
    uploadedBy: uploadedBy,
    linkToPost: linkToPost,
    abuseProfile: abuseProfile._id,
  });
  res.send({ abuseProfile: abuseProfile, report: report });
});

exports.updateAbuseProfile = handlerFactory.updateOne(AbuseProfile);
exports.getAllAbuseProfiles = handlerFactory.getAll(AbuseProfile);
exports.getAbuseProfile = handlerFactory.getOne(AbuseProfile);
exports.deleteAbuseProfile = handlerFactory.deleteOne(AbuseProfile);
