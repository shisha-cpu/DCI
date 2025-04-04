const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');

// // Upload single file
// router.post(
//   '/upload',
//   authMiddleware.protect,
//   uploadMiddleware.singleUpload,
//   fileController.uploadFile
// );

// // Get all files for current user
// router.get(
//   '/',
//   authMiddleware.protect,
//   fileController.getFiles
// );

// // Get single file
// router.get(
//   '/:id',
//   authMiddleware.protect,
//   fileController.getFile
// );

// // Delete file
// router.delete(
//   '/:id',
//   authMiddleware.protect,
//   fileController.deleteFile
// );

module.exports = router;