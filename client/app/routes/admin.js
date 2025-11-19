const express = require('express');
const router = express.Router();
const adminController = require('../../../Sahay-microvolunteering_app/controllers/adminController');
const { isAuthenticated, isAdmin } = require('../../../Sahay-microvolunteering_app/middleware/auth');

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private/Admin
router.get('/dashboard', isAuthenticated, isAdmin, adminController.getDashboardStats);

// @route   GET /api/admin/volunteers
// @desc    Get all volunteers
// @access  Private/Admin
router.get('/volunteers', isAuthenticated, isAdmin, adminController.getAllVolunteers);

// @route   GET /api/admin/event-bookings
// @desc    Get all event bookings
// @access  Private/Admin
router.get('/event-bookings', isAuthenticated, isAdmin, adminController.getAllEventBookings);

// @route   PUT /api/admin/event-bookings/:id/status
// @desc    Update event booking status
// @access  Private/Admin
router.put('/event-bookings/:id/status', isAuthenticated, isAdmin, adminController.updateEventBookingStatus);

// @route   PUT /api/admin/volunteer-work/:id/review
// @desc    Review volunteer work
// @access  Private/Admin
router.put('/volunteer-work/:id/review', isAuthenticated, isAdmin, adminController.reviewVolunteerWork);

module.exports = router;