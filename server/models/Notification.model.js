const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['system', 'listing', 'payment', 'referral', 'other'],
    default: 'system',
  },
  relatedEntity: {
    type: mongoose.Schema.ObjectId,
    refPath: 'onModel',
  },
  onModel: {
    type: String,
    enum: ['Listing', 'Payment', 'Referral', 'User'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);