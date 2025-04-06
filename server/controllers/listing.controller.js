const Listing = require('../models/Listing.model');
const File = require('../models/File.model');
const ErrorResponse = require('../utils/ErrorResponse')
const fs = require('fs');
const path = require('path');
const processFiles = async (files, userId) => {
  return Promise.all(files.map(async file => {
    const newFile = await File.create({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: `/uploads/listings/${file.filename}`,
      createdBy: userId
    });
    return newFile._id;
  }));
};
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
    next(err);
  }
};
exports.createListing = async (req, res, next) => {
  try {
    console.log('Incoming request body:', req.body);
    console.log('Images data:', req.body.images); // Добавим лог для images

    let imageIds = [];
    if (req.body.images && req.body.images.length > 0) {
      imageIds = await Promise.all(req.body.images.map(async (image) => {
        // Обрабатываем как URL строку или объект
        const imageUrl = typeof image === 'string' ? image : image.url || image.path;
        
        if (!imageUrl) {
          console.warn('Invalid image format:', image);
          return null;
        }

        // Извлекаем имя файла из URL
        const filename = imageUrl.split('/').pop();
        
        // Проверяем существование файла
        const existingFile = await File.findOne({ filename });
        if (existingFile) {
          console.log('Using existing file:', existingFile._id);
          return existingFile._id;
        }
        
        // Создаем новую запись
        const newFile = await File.create({
          filename,
          path: `/uploads/listings/${filename}`,
          originalname: filename,
          mimetype: image.mimetype || 'image/png',
          size: image.size || 0,
          createdBy: req.body.createdBy
        });

        console.log('Created new file:', newFile._id);
        return newFile._id;
      }));

      // Фильтруем возможные null значения
      imageIds = imageIds.filter(id => id !== null);
    }

    console.log('Processed image IDs:', imageIds);

    const listingData = {
      ...req.body,
      images: imageIds
    };

    const listing = await Listing.create(listingData);
    
    res.status(201).json({
      success: true,
      data: listing
    });
  } catch (err) {
    console.error('Error in createListing:', err);
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
      try {
        // Удаляем физический файл изображения
        const filePath = path.join(__dirname, '..', 'uploads', 'listings', image.filename);
        
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${filePath}`);
        } else {
          console.log(`File not found: ${filePath}`);
        }

        // Удаляем запись о файле из базы данных
        await File.findByIdAndDelete(image._id);
        console.log(`Deleted file record from DB: ${image._id}`);
      } catch (fileError) {
        console.error(`Error deleting file ${image.filename}:`, fileError);
        // Продолжаем удаление, даже если возникла ошибка с одним файлом
      }
    }

    // Удаляем само объявление
    await Listing.deleteOne({ _id: req.params.id });
    console.log(`Deleted listing: ${req.params.id}`);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Error in deleteListing:', err);
    next(err);
  }
};