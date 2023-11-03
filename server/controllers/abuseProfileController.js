const AbuseProfile = require("../models/abuseProfileModel");
const handlerFactory = require("./handlerFactory");

exports.createAbuseProfile = handlerFactory.createOne(AbuseProfile);
exports.updateAbuseProfile = handlerFactory.updateOne(AbuseProfile);
exports.getAllAbuseProfiles = handlerFactory.getAll(AbuseProfile)
exports.getAbuseProfile = handlerFactory.getOne(AbuseProfile);
exports.deleteAbuseProfile = handlerFactory.deleteOne(AbuseProfile);
