const Listing = require('../models/Listing.model');
const User = require('../models/User.model');
const ErrorResponse = require('../utils/ErrorResponse');

exports.approveListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true, runValidators: true }
    );

    if (!listing) {
      return next(new ErrorResponse('Listing not found', 404));
    }

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (err) {
    next(err);
  }
};

exports.rejectListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true, runValidators: true }
    );

    if (!listing) {
      return next(new ErrorResponse('Listing not found', 404));
    }

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (err) {
    next(err);
  }
};

exports.blockUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true, runValidators: true }
    );

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.unblockUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true, runValidators: true }
    );

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments();
    const listingsCount = await Listing.countDocuments();
    const activeListingsCount = await Listing.countDocuments({ status: 'approved' });
    const pendingListingsCount = await Listing.countDocuments({ status: 'pending' });

    res.status(200).json({
      success: true,
      data: {
        usersCount,
        listingsCount,
        activeListingsCount,
        pendingListingsCount,
      },
    });
  } catch (err) {
    next(err);
  }
};