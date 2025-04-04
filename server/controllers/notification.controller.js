const Notification = require('../models/Notification.model');
// const ErrorResponse = require('../utils/ErrorResponse');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort('-createdAt')
      .populate('relatedEntity');

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (err) {
    next(err);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return 
    //   next(new ErrorResponse('Notification not found', 404));
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return
    //    next(new ErrorResponse('Notification not found', 404));
    }

    // Make sure user owns the notification
    if (notification.user.toString() !== req.user.id) {
      return 
    //   next(new ErrorResponse('Not authorized', 401));
    }

    await notification.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};