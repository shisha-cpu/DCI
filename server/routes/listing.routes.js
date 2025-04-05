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

// Упрощенная конфигурация Multer
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
    const filetypes = /jpe?g|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    mimetype && extname ? cb(null, true) : cb(new Error('Only images are allowed'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
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