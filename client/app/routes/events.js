const express = require('express');
const router = express.Router();
const eventController = require('../../../Sahay-microvolunteering_app/controllers/eventController');
//const { validateEventBooking } = require('../middleware/validation');
const { isAuthenticated } = require('../../../Sahay-microvolunteering_app/middleware/auth');

// @route   POST /api/events
// @desc    Create event booking
// @access  Private
router.post('/', isAuthenticated, validateEventBooking, eventController.createEventBooking);

// @route   GET /api/events/my-bookings
// @desc    Get user's event bookings
// @access  Private
router.get('/my-bookings', isAuthenticated, eventController.getUserEventBookings);

// @route   GET /api/events/:id
// @desc    Get single event booking
// @access  Private
router.get('/:id', isAuthenticated, eventController.getEventBooking);

// @route   PUT /api/events/:id
// @desc    Update event booking
// @access  Private
router.put('/:id', isAuthenticated, validateEventBooking, eventController.updateEventBooking);

// @route   DELETE /api/events/:id
// @desc    Cancel event booking
// @access  Private
router.delete('/:id', isAuthenticated, eventController.cancelEventBooking);

module.exports = router;