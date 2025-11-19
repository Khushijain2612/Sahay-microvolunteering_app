const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboard,
  getMyApplications,
  getMyEvents,
  updateWorkStatus,
  addWorkProof,
  rateWork
} = require('../controllers/volunteerController');

const router = express.Router();

router.get('/dashboard', protect, authorize('volunteer'), getDashboard);
router.get('/applications', protect, authorize('volunteer'), getMyApplications);
router.get('/events', protect, authorize('volunteer'), getMyEvents);
router.put('/work/:id/status', protect, authorize('volunteer'), updateWorkStatus);
router.post('/work/:id/proof', protect, authorize('volunteer'), addWorkProof);
router.post('/work/:id/rate', protect, authorize('volunteer'), rateWork);

module.exports = router;