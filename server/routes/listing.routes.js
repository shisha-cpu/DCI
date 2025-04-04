const express = require('express');
const router = express.Router();
const {
  getListings,
  getListing,
  createListing,
  deleteListing,
  getListingsByUser
} = require('../controllers/listing.controller');

router.get('/', getListings);
router.get('/:id', getListing);
router.get('/user/:userId', getListingsByUser);
router.post('/' , createListing);
router.delete('/:id', deleteListing);


module.exports = router;