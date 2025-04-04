const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
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

// Конфигурация хранилища для Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../public/uploads/listings');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `listing-${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

// Фильтр файлов (только изображения)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Допустимы только файлы изображений (jpeg, jpg, png, gif)'));
};

// Инициализация Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10 // Максимум 10 файлов
  }
});

// Маршруты
router.get('/', getListings);
router.get('/:id', getListing);
router.get('/user/:userId', getListingsByUser);

// Отдельный маршрут для загрузки изображений
router.post('/upload', protect, upload.array('images', 10), uploadListingImages);

// Маршруты для объявлений с обработкой изображений
router.post('/', protect, upload.array('images', 10), createListing);
router.put('/:id', protect, upload.array('images', 10), updateListing);
router.delete('/:id', protect, deleteListing);

module.exports = router;