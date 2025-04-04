const express = require('express');
const router = express.Router();
const {
  getReferrals,
  createReferral,
  getReferralStats,
} = require('../controllers/referral.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', protect, getReferrals);
router.post('/', protect, createReferral);
router.get('/stats', protect, getReferralStats);

module.exports = router;