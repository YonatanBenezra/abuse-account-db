const express = require('express');
const abuseProfileController = require('../controllers/abuseProfileController');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for getting all AbuseProfiles and creating a new AbuseProfile
router
  .route('/')
  .get(abuseProfileController.getAllAbuseProfiles)
  .post(abuseProfileController.createOrUpdateProfile);

// Route for getting recent abuseProfiles
router.route('/:limit').get(abuseProfileController.getRecentAbuseProfile);

// Routes for getting, updating, and deleting a specific AbuseProfile
router
  .route('/:id')
  .get(abuseProfileController.getAbuseProfile)
  .patch(
    authController.protectAndRestrictTo('admin'),
    abuseProfileController.updateAbuseProfile
  )
  .delete(
    authController.protectAndRestrictTo('admin'),
    abuseProfileController.deleteAbuseProfile
  );

module.exports = router;
