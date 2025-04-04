const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListingSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  type: {
    type: String,
    required: [true, 'Please select a type'],
    enum: [
      'residential',
      'commercial',
      'land',
      'business',
      'franchise',
      'other',
    ],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
  },
  subcategory: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  location: {
    city: {
      type: String,
      required: [true, 'Please add a city'],
    },
    district: {
      type: String,
    },
    address: {
      type: String,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere',
    },
  },
  area: {
    type: Number,
  },
  rooms: {
    type: Number,
  },
  features: {
    type: [String],
  },
  images: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
  ],
  videos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
  ],
  documents: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold'],
    default: 'pending',
  },
  views: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Update the updatedAt field on save
ListingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Listing', ListingSchema);