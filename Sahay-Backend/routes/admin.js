const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getUsers,
  updateUserStatus,
  getStatistics,
  getOpportunitiesForReview,
  reviewOpportunity,
  getAnalytics
} = require('../controllers/adminController');

const router = express.Router();

// All routes protected and only for admins
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);
router.get('/stats', getStatistics);
router.get('/analytics', getAnalytics);
router.get('/opportunities/review', getOpportunitiesForReview);
router.put('/opportunities/:id/review', reviewOpportunity);

module.exports = router;