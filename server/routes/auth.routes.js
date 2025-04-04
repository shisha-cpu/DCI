const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyEmail,
  verifyLogin,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/verify-login/:token', verifyLogin);

router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;