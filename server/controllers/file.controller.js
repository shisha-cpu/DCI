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