const express = require('express');
const router = express.Router();
const {
  approveListing,
  rejectListing,
  blockUser,
  unblockUser,
  getDashboardStats,
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

router.put('/listings/:id/approve', protect, authorize('admin'), approveListing);
router.put('/listings/:id/reject', protect, authorize('admin'), rejectListing);
router.put('/users/:id/block', protect, authorize('admin'), blockUser);
router.put('/users/:id/unblock', protect, authorize('admin'), unblockUser);
router.get('/stats', protect, authorize('admin'), getDashboardStats);

module.exports = router;