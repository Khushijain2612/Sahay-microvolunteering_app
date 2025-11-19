const express = require('express');
const {
  getOpportunities,
  getOpportunity,
  createOpportunity,
  applyForOpportunity
} = require('../controllers/opportunityController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getOpportunities)
  .post(protect, authorize('organization', 'admin'), createOpportunity);

router.route('/:id')
  .get(getOpportunity);

router.post('/:id/apply', protect, authorize('volunteer'), applyForOpportunity);

module.exports = router;