const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPayments,
  getPayment,
  verifyPayment,
} = require('../controllers/payment.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/', protect, createPayment);
router.get('/', protect, getPayments);
router.get('/:id', protect, getPayment);
router.post('/:id/verify', protect, verifyPayment);

module.exports = router;