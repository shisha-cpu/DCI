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
  const videoIds = [];
  
  if (files && files.length > 0) {
    for (const file of files) {
      const isImage = /jpe?g|png|gif/i.test(file.mimetype);
      const isVideo = /mp4|mov|avi|wmv/i.test(file.mimetype);
      
      const newFile = await File.create({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: `/uploads/listings/${file.filename}`,
        createdBy: userId,
        fileType: isImage ? 'image' : (isVideo ? 'video' : 'document')
      });
      
      if (isImage) {
        imageIds.push(newFile._id);
      } else if (isVideo) {
        videoIds.push(newFile._id);
      } else {
        documentIds.push(newFile._id);
      }
    }
  }
  
  return { imageIds, documentIds, videoIds };
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
    let imageIds = [];
    let videoIds = [];
    let documentIds = [];
    console.log(req.body.createdBy);
    
    // Обработка загруженных файлов
    if (req.files && req.files.length > 0) {
      const result = await processUploadedFiles(req.files, req.body.createdBy);
      imageIds = result.imageIds;
      videoIds = result.videoIds;
      documentIds = result.documentIds;
    }
    
    // Обработка существующих файлов из тела запроса
    if (req.body.images && req.body.images.length > 0) {
      imageIds = await processExistingFiles(req.body.images, req.body.createdBy, 'image');
    }
    
    if (req.body.videos && req.body.videos.length > 0) {
      videoIds = await processExistingFiles(req.body.videos, req.body.createdBy, 'video');
    }
    
    if (req.body.documents && req.body.documents.length > 0) {
      documentIds = await processExistingFiles(req.body.documents, req.body.createdBy, 'document');
    }

    const listingData = {
      ...req.body,
      images: imageIds,
      videos: videoIds,
      documents: documentIds,
      createdBy: req.body.createdBy
    };

    const listing = await Listing.create(listingData);
    
    const populatedListing = await Listing.findById(listing._id)
      .populate('images', 'path originalname mimetype')
      .populate('videos', 'path originalname mimetype')
      .populate('documents', 'path originalname mimetype');

    res.status(201).json({
      success: true,
      data: populatedListing
    });
  } catch (err) {
    console.log(err);
    
    next(err);
  }
};
async function processExistingFiles(files, userId, fileType) {
  return Promise.all(files.map(async (file) => {
    const fileUrl = typeof file === 'string' ? file : file.url || file.path;
    if (!fileUrl) return null;

    const filename = fileUrl.split('/').pop();
    const existingFile = await File.findOne({ filename });
    
    if (existingFile) return existingFile._id;
    
    const newFile = await File.create({
      filename,
      path: `/uploads/listings/${filename}`,
      originalname: file.originalname || filename,
      mimetype: file.mimetype || getDefaultMimeType(fileType),
      size: file.size || 0,
      createdBy: userId,
      fileType
    });
    
    return newFile._id;
  })).then(ids => ids.filter(id => id !== null));
}
function getDefaultMimeType(fileType) {
  const types = {
    image: 'image/jpeg',
    video: 'video/mp4',
    document: 'application/octet-stream'
  };
  return types[fileType] || 'application/octet-stream';
}
exports.updateListing = async (req, res, next) => {
  try {
    let imageIds = [];
    let videoIds = [];
    let documentIds = [];
    
    if (req.files && req.files.length > 0) {
      const result = await processUploadedFiles(req.files, req.user.id);
      imageIds = result.imageIds;
      videoIds = result.videoIds;
      documentIds = result.documentIds;
    }
    
    const listingData = {
      ...req.body,
      images: imageIds,
      videos: videoIds,
      documents: documentIds
    };

    const listing = await Listing.findByIdAndUpdate(
      req.params.id, 
      listingData, 
      { new: true, runValidators: true }
    )
    .populate('images', 'path originalname mimetype')
    .populate('videos', 'path originalname mimetype')
    .populate('documents', 'path originalname mimetype');

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
      .populate({
        path: 'images',
        select: 'path originalname mimetype'
      })
      .populate({
        path: 'videos',
        select: 'path originalname mimetype'
      })
      .populate({
        path: 'documents',
        select: 'path originalname mimetype'
      })
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
      .populate({
        path: 'images',
        select: 'path originalname mimetype'
      })
      .populate({
        path: 'videos',
        select: 'path originalname mimetype'
      })
      .populate({
        path: 'documents',
        select: 'path originalname mimetype'
      })
      .populate('createdBy', 'name email');

    if (!listing) {
      return next(new ErrorResponse('Listing not found', 404));
    }

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
      .populate({
        path: 'images',
        select: 'path originalname mimetype'
      })
      .populate({
        path: 'videos',
        select: 'path originalname mimetype'
      })
      .populate({
        path: 'documents',
        select: 'path originalname mimetype'
      });

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
      .populate('videos')
      .populate('documents');

    if (!listing) {
      return next(new ErrorResponse('Listing not found', 404));
    }

    // Объединяем все файлы
    const allFiles = [...listing.images, ...listing.videos, ...listing.documents];
    
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