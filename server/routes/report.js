const express = require('express');
const reportController = require('../controllers/reportsController');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for getting all Reports and creating a new Report
router
  .route('/')
  .get(reportController.getAllReports)
  .post(reportController.createReport);

// Route for getting recent Reports
router.route('/:limit').get(reportController.getRecentReports);

// Routes for getting, updating, and deleting a specific Report
router
  .route('/:id')
  .get(reportController.getReport)
  .patch(
    authController.protectAndRestrictTo('admin'),
    reportController.updateReport
  )
  .delete(
    authController.protectAndRestrictTo('admin'),
    reportController.deleteReport
  );

module.exports = router;
