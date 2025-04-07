const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getListingsByUser,
  uploadListingImages
} = require('../controllers/listing.controller');
const { protect } = require('../middlewares/auth.middleware');

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => {
      const uploadDir = path.join(__dirname, '../uploads/listings');
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (_, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `listing-${uuidv4()}${ext}`);
    }
  }),
  fileFilter: (_, file, cb) => {
    const imageTypes = /jpe?g|png|gif/;
    const docTypes = /pdf|docx?|ppt|pptx/;
    
    const mimetype = imageTypes.test(file.mimetype) || docTypes.test(file.mimetype);
    const extname = imageTypes.test(path.extname(file.originalname).toLowerCase()) || 
                   docTypes.test(path.extname(file.originalname).toLowerCase());
    
    mimetype && extname ? cb(null, true) : cb(new Error('Only images and documents (PDF, DOC, DOCX, PPT, PPTX) are allowed'));
  },
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB (увеличили для документов)
});
// Маршрут для загрузки документов
router.post('/upload-documents', upload.array('documents', 5), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Пожалуйста, загрузите хотя бы один документ'
      });
    }

    const fileData = req.files.map(file => ({
      url: `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/listings/${file.filename}`,
      path: `/uploads/listings/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    }));

    res.status(200).json({
      success: true,
      data: fileData
    });
  } catch (err) {
    next(err);
  }
});
// Маршруты
router.get('/', getListings);
router.get('/:id', getListing);
router.get('/user/:userId', getListingsByUser);
router.get('/uploads/listings/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads/listings', req.params.filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ 
      success: false, 
      message: 'File not found' 
    });
  }
});
router.post('/upload', upload.array('images', 10), uploadListingImages);
router.post('/', upload.array('images', 10), createListing);
router.put('/:id', upload.array('images', 10), updateListing);
router.delete('/:id', deleteListing);

module.exports = router;