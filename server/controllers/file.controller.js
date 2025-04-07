const File = require('../models/File.model');
const ErrorResponse = require('../utils/ErrorResponse');
const fs = require('fs');
const path = require('path');

exports.deleteFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return next(new ErrorResponse('File not found', 404));
    }

    // Check if user is authorized to delete
    if (file.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to delete this file', 401));
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, `../public${file.path}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await file.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// В controllers/file.controller.js
exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Пожалуйста, загрузите хотя бы одно изображение'
      });
    }

    const fileData = await Promise.all(req.files.map(async file => {
      const newFile = await File.create({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: `/uploads/listings/${file.filename}`,
        url: `${process.env.BASE_URL}/uploads/listings/${file.filename}`,
        createdBy: req.user.id,
        fileType: 'image'
      });
      return newFile;
    }));

    res.status(200).json({
      success: true,
      data: fileData
    });
  } catch (err) {
    next(err);
  }
};

