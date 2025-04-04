const Listing = require('../models/Listing.model');
const ErrorResponse = require('../utils/errorResponse');

// Простое создание объявления
exports.createListing = async (req, res, next) => {

  try {

    if (req.files && req.files.images) {
      const images = [];
      const uploadDir = path.join(__dirname, '../public/uploads');
      
      // Создаем директорию, если ее нет
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Обрабатываем каждое изображение
      const files = Array.isArray(req.files.images) 
        ? req.files.images 
        : [req.files.images];
      
      for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        
        await file.mv(filePath);
        images.push(fileName);
      }
      
      req.body.images = images;
    }

    const listing = await Listing.create(req.body);
    res.status(201).json({
      success: true,
      data: listing
    });
  } catch (err) {
    next(err);
  }
};

exports.getListingsByUser = async (req, res, next) => {
  try {

    const listings = await Listing.find({ createdBy: req.params.userId });
    
    if (!listings) {
      return next(new ErrorResponse('No listings found for this user', 404));
    }
    
    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (err) {
    next(err);
  }
};
// Получение всех объявлений (упрощенное)
exports.getListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (err) {
    next(err);
  }
};

// Получение одного объявления
exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
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

// Удаление объявления
exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    
    if (!listing) {
      return next(new ErrorResponse('Listing not found', 404));
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

