const express = require('express');
const router = express.Router();
const opportunityController = require('../../../Sahay-microvolunteering_app/controllers/opportunityController');
//const { validateOpportunity } = require('../middleware/validation');
const { isAuthenticated, isAdmin, isVolunteer } = require('../../../Sahay-microvolunteering_app/middleware/auth');

// @route   GET /api/opportunities
// @desc    Get all opportunities
// @access  Public
router.get('/', opportunityController.getAllOpportunities);

// @route   GET /api/opportunities/:id
// @desc    Get single opportunity
// @access  Public
router.get('/:id', opportunityController.getOpportunity);

// @route   POST /api/opportunities
// @desc    Create new opportunity
// @access  Private/Admin
router.post('/', isAuthenticated, isAdmin, validateOpportunity, opportunityController.createOpportunity);

// @route   POST /api/opportunities/:id/book
// @desc    Book an opportunity
// @access  Private/Volunteer
router.post('/:id/book', isAuthenticated, isVolunteer, opportunityController.bookOpportunity);

// @route   POST /api/opportunities/:id/cancel
// @desc    Cancel booking
// @access  Private/Volunteer
router.post('/:id/cancel', isAuthenticated, isVolunteer, opportunityController.cancelBooking);

// @route   PUT /api/opportunities/:id
// @desc    Update opportunity
// @access  Private/Admin
router.put('/:id', isAuthenticated, isAdmin, validateOpportunity, opportunityController.updateOpportunity);

// @route   DELETE /api/opportunities/:id
// @desc    Delete opportunity
// @access  Private/Admin
router.delete('/:id', isAuthenticated, isAdmin, opportunityController.deleteOpportunity);

module.exports = router;