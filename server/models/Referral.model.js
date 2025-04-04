const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReferralSchema = new Schema({
  referrer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  referred: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending',
  },
  bonusAmount: {
    type: Number,
    default: 0,
  },
  bonusPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Referral', ReferralSchema);