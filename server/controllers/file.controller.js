const File = require('../models/File.model');
// const ErrorResponse = require('../utils/ErrorResponse');
const fs = require('fs');
const path = require('path');

// @desc    Upload file
// @route   POST /api/files/upload
// @access  Private
exports.uploadFile = async (req, res, next) => {
    try {
      if (!req.file) {
        return
         next(new ErrorResponse('Please upload a file', 400));
      }
  
      const file = await File.create({
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        type: req.file.mimetype.split('/')[0],
        uploadedBy: req.user.id
      });
  
      res.status(201).json({
        success: true,
        data: file
      });
    } catch (err) {
      next(err);
    }
  };
// @desc    Get all files
// @route   GET /api/files
// @access  Private
exports.getFiles = async (req, res, next) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id });

    res.status(200).json({
      success: true,
      count: files.length,
      data: files,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single file
// @route   GET /api/files/:id
// @access  Private
exports.getFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return
       next(
        new ErrorResponse(`File not found with id of ${req.params.id}`, 404)
      );
    }

  


    res.status(200).json({
      success: true,
      data: file,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete file
// @route   DELETE /api/files/:id
// @access  Private
exports.deleteFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return 
      next(
        new ErrorResponse(`File not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is file owner
    if (file.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return
       next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this file`,
          401
        )
      );
    }

    // Delete file from server
    const filePath = path.join(__dirname, '..', file.path);
    fs.unlink(filePath, (err) => {
      if (err) console.error(err);
    });

    await file.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};