const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  deleteMe,
} = require('../controllers/user.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Protect all routes
router.use(protect);

// Routes for current user
router.get('/me', getMe);
router.put('/me', updateMe);
router.delete('/me', deleteMe);

// Admin-only routes
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;