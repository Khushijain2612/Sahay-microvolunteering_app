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
// Add this to your adminController
const getAdminDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Admin dashboard accessed successfully',
      data: {
        message: 'Welcome to Admin Dashboard',
        availableEndpoints: [
          'GET /api/admin/users',
          'PUT /api/admin/users/:id/status', 
          'GET /api/admin/stats',
          'GET /api/admin/analytics',
          'GET /api/admin/opportunities/review',
          'PUT /api/admin/opportunities/:id/review'
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Add to your exports
module.exports = {
  // ... your existing exports
  getAdminDashboard
};

// module.exports = router;