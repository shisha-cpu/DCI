const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { deleteFile } = require('../controllers/file.controller');

router.delete('/:id', protect, deleteFile);

module.exports = router;