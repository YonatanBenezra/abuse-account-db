const AbuseProfile = require('../models/abuseProfileModel'); // Assuming this is the file path
const Report = require('../models/reportModel'); // Assuming this is the file path
const handlerFactory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

const url = require('url');

exports.createOrUpdateProfile = catchAsync(async (req, res, next) => {
  const { profileLink, categories, comment, uploadedBy, linkToPost } = req.body;

  // Normalize the profileLink
  const normalizedProfileLink = normalizeProfileLink(profileLink);

  // Find the abuse profile or create a new one if it doesn't exist
  let abuseProfile = await AbuseProfile.findOneAndUpdate(
    { profileLink: normalizedProfileLink },
    {},
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  if (!abuseProfile) {
    abuseProfile = await AbuseProfile.create({
      profileLink: normalizedProfileLink,
    });
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

// Helper function to normalize a profile link
function normalizeProfileLink(profileLink) {
  let normalizedLink = profileLink.trim();

  // Remove the protocol (http, https) and "www"
  normalizedLink = normalizedLink.replace(/^(?:https?:\/\/)?(?:www\.)?/, '');

  // Remove a trailing slash
  normalizedLink = normalizedLink.replace(/\/$/, '');

  // Lowercase the URL
  normalizedLink = normalizedLink.toLowerCase();

  // Return the normalized URL
  return normalizedLink;
}

exports.updateAbuseProfile = handlerFactory.updateOne(AbuseProfile);
exports.getAllAbuseProfiles = handlerFactory.getAll(AbuseProfile);
exports.getRecentAbuseProfile = handlerFactory.getRecent(AbuseProfile);
exports.getAbuseProfile = handlerFactory.getOne(AbuseProfile);
exports.deleteAbuseProfile = handlerFactory.deleteOne(AbuseProfile);

// Helper function to normalize a profile link
function normalizeProfileLink(profileLink) {
  let normalizedLink = profileLink.trim();
  normalizedLink = normalizedLink.replace(/^(?:https?:\/\/)?(?:www\.)?/, '');
  normalizedLink = normalizedLink.replace(/\/$/, '');
  normalizedLink = normalizedLink.toLowerCase();
  return normalizedLink;
}

exports.updateProfileLinks = catchAsync(async (req, res, next) => {
  // Fetch all abuseProfiles
  const abuseProfiles = await AbuseProfile.find({});

  for (let profile of abuseProfiles) {
    // Normalize the profileLink of each abuseProfile
    const normalizedLink = normalizeProfileLink(profile.profileLink);
    // Check if it's different from the current one
    if (normalizedLink !== profile.profileLink) {
      // Update with the new normalized link
      profile.profileLink = normalizedLink;
      await profile.save();
      console.log(`Updated: ${normalizedLink}`);
    }
  }

  console.log('Finished updating all profile links.');
});
