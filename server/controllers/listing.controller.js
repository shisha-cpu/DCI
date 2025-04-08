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
  const documentIds = [];
  
  if (files && files.length > 0) {
    for (const file of files) {
      const isImage = /jpe?g|png|gif/i.test(file.mimetype);
      const newFile = await File.create({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: `/uploads/listings/${file.filename}`,
        createdBy: userId,
        fileType: isImage ? 'image' : 'document'
      });
      
      if (isImage) {
        imageIds.push(newFile._id);
      } else {
        documentIds.push(newFile._id);
      }
    }
  }
  
  return { imageIds, documentIds };
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
      url: `${process.env.BASE_URL || 'http://62.113.110.123:5000'}/uploads/listings/${file.filename}`,
      path: `/uploads/listings/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname
    }));

    res.status(200).json({
      success: true,
      data: fileData
    });
  } catch (err) {
    console.log(err);
    
    next(err);
  }
};
exports.createListing = async (req, res, next) => {
  try {
    console.log('Incoming request body:', req.body);
    
    let imageIds = [];
    let documentIds = []; // Теперь храним только ID документов
    
    // Обработка загруженных файлов
    if (req.files && req.files.length > 0) {
      const result = await processUploadedFiles(req.files, req.user.id);
      imageIds = result.imageIds;
      documentIds = result.documentIds || [];
    }
    
    // Обработка уже существующих файлов (из тела запроса)
    if (req.body.images && req.body.images.length > 0) {
      imageIds = await Promise.all(req.body.images.map(async (image) => {
        const imageUrl = typeof image === 'string' ? image : image.url || image.path;
        
        if (!imageUrl) {
          console.warn('Invalid image format:', image);
          return null;
        }

        const filename = imageUrl.split('/').pop();
        
        const existingFile = await File.findOne({ filename });
        if (existingFile) {
          console.log('Using existing file:', existingFile._id);
          return existingFile._id;
        }
        
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

      imageIds = imageIds.filter(id => id !== null);
    }

    if (req.body.documents && req.body.documents.length > 0) {
      documentIds = await Promise.all(req.body.documents.map(async (doc) => {
        const docUrl = typeof doc === 'string' ? doc : doc.url || doc.path;
        
        if (!docUrl) {
          console.warn('Invalid document format:', doc);
          return null;
        }

        const filename = docUrl.split('/').pop();
        
        const existingFile = await File.findOne({ filename });
        if (existingFile) {
          console.log('Using existing document:', existingFile._id);
          return existingFile._id;
        }
        
        const newFile = await File.create({
          filename,
          path: `/uploads/listings/${filename}`,
          originalname: doc.originalname || filename,
          mimetype: doc.mimetype || 'application/octet-stream',
          size: doc.size || 0,
          createdBy: req.body.createdBy,
          fileType: 'document'
        });

        console.log('Created new document:', newFile._id);
        return newFile._id;
      }));

      documentIds = documentIds.filter(id => id !== null);
    }

    const listingData = {
      ...req.body,
      images: imageIds,
      documents: documentIds // Теперь передаем только ID документов
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
    let imageIds = [];
    let documentIds = [];
    
    if (req.files && req.files.length > 0) {
      const result = await processUploadedFiles(req.files, req.user.id);
      imageIds = result.imageIds;
      documentIds = result.documentIds;
    }
    
    const listingData = {
      ...req.body,
      images: imageIds,
      documents: documentIds
    };

    const listing = await Listing.findByIdAndUpdate(
      req.params.id, 
      listingData, 
      { new: true, runValidators: true }
    ).populate('images').populate('documents');

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
      .populate('images', 'path originalname mimetype')
      .populate('documents', 'path originalname mimetype')
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

// Аналогично для других методов получения
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
    const listing = await Listing.findById(req.params.id)
      .populate('images')
      .populate('documents');

    if (!listing) {
      return next(new ErrorResponse('Listing not found', 404));
    }

    // Объединяем все файлы (изображения и документы)
    const allFiles = [...listing.images, ...listing.documents];
    
    for (const file of allFiles) {
      try {
        const filePath = path.join(__dirname, '..', 'uploads', 'listings', file.filename);
        
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

        await File.findByIdAndDelete(file._id);
      } catch (fileError) {
        console.error(`Error deleting file ${file.filename}:`, fileError);
      }
    }

    await Listing.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Error in deleteListing:', err);
    next(err);
  }
};