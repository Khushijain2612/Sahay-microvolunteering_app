const express = require('express');
const router = express.Router();
const volunteerController = require('../../../Sahay-microvolunteering_app/controllers/volunteerController');
const { isAuthenticated, isVolunteer } = require('../../../Sahay-microvolunteering_app/middleware/auth');

// @route   GET /api/volunteer/dashboard
// @desc    Get volunteer dashboard
// @access  Private/Volunteer
router.get('/dashboard', isAuthenticated, isVolunteer, volunteerController.getDashboard);

// @route   GET /api/volunteer/work-history
// @desc    Get volunteer work history
// @access  Private/Volunteer
router.get('/work-history', isAuthenticated, isVolunteer, volunteerController.getWorkHistory);

// @route   GET /api/volunteer/booked-opportunities
// @desc    Get volunteer's booked opportunities
// @access  Private/Volunteer
router.get('/booked-opportunities', isAuthenticated, isVolunteer, volunteerController.getBookedOpportunities);

module.exports = router;