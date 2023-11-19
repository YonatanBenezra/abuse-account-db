const Report = require('../models/reportModel'); // Assuming this is the file path
const handlerFactory = require('./handlerFactory');

exports.createReport = handlerFactory.createOne(Report);
exports.updateReport = handlerFactory.updateOne(Report);
exports.getAllReports = handlerFactory.getAll(Report, 'abuseProfile');
exports.getRecentReports = handlerFactory.getRecent(Report);
exports.getReport = handlerFactory.getOne(Report);
exports.deleteReport = handlerFactory.deleteOne(Report);
