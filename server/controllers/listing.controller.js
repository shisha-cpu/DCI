const Listing = require('../models/Listing.model');
const File = require('../models/File.model');
const ErrorResponse = require('../utils/errorResponse');
const fs = require('fs');
const path = require('path');

// Helper function to process uploaded files
const processUploadedFiles = async (files, userId) => {
  const imageIds = [];
  if (files && files.length > 0) {
    for (const file of files) {
      const newFile = await File.create({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: `/uploads/listings/${file.filename}`,
        createdBy: userId
      });
      imageIds.push(newFile._id);
    }
  }
  return imageIds;
};
exports.uploadListingImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Пожалуйста, загрузите хотя бы одно изображение'
      });
    }

    const fileData = req.files.map(file => ({
      url: `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/listings/${file.filename}`,
      path: `/uploads/listings/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname
    }));

    res.status(200).json({
      success: true,
      data: fileData
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      success: false,
      message: 'Ошибка при загрузке изображений'
    });
  }
};
exports.createListing = async (req, res, next) => {
  try {
    const imageIds = await processUploadedFiles(req.files, req.user.id);

    const listingData = {
      ...req.body,
      createdBy: req.user.id,
      images: imageIds
    };

    const listing = await Listing.create(listingData);

    res.status(201).json({
      success: true,
      data: listing
    });
  } catch (err) {
    console.error('Create listing error:', err);
    next(err);
  }
};

exports.updateListing = async (req, res, next) => {
  try {
    const imageIds = await processUploadedFiles(req.files, req.user.id);
    
    const listingData = {
      ...req.body,
      images: imageIds
    };

    const listing = await Listing.findByIdAndUpdate(
      req.params.id, 
      listingData, 
      { new: true, runValidators: true }
    ).populate('images');

    if (!listing) {
      return next(new ErrorResponse('Listing not found', 404));
    }

    res.status(200).json({
      success: true,
      data: listing
    });
  } catch (err) {
    next(err);
  }
};

exports.getListings = async (req, res, next) => {
  try {
    const listings = await Listing.find()
      .populate('images', 'path originalname')
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (err) {
    next(err);
  }
};

exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('images', 'path originalname')
      .populate('createdBy', 'name email');

    if (!listing) {
      return next(new ErrorResponse('Listing not found', 404));
    }

    // Increment views
    listing.views += 1;
    await listing.save();

    res.status(200).json({
      success: true,
      data: listing
    });
  } catch (err) {
    next(err);
  }
};

exports.getListingsByUser = async (req, res, next) => {
  try {
    const listings = await Listing.find({ createdBy: req.params.userId })
      .populate('images', 'path originalname');

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('images');

    if (!listing) {
      return next(new ErrorResponse('Listing not found', 404));
    }

    // Delete associated files
    for (const image of listing.images) {
      const filePath = path.join(__dirname, `../public${image.path}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await File.findByIdAndDelete(image._id);
    }

    await listing.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};