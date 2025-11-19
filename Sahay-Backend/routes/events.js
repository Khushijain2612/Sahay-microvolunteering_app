const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  assignVolunteer,
  completeVolunteerAssignment
} = require('../controllers/eventController');

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, authorize('organization', 'admin'), createEvent);

router.route('/:id')
  .get(getEvent)
  .put(protect, authorize('organization', 'admin'), updateEvent);

router.post('/:id/assign', protect, authorize('organization', 'admin'), assignVolunteer);
router.put('/:eventId/volunteers/:volunteerId/complete', protect, authorize('organization', 'admin'), completeVolunteerAssignment);
// In your main server file
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes); // Make sure it's mounted like this

module.exports = router;