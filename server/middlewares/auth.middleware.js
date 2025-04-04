const { verifyToken } = require('../config/jwt');
// const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User.model');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // if (!token) {
  //   return next(new ErrorResponse('Not aut1horized to access this route', 401));
  // }

  try {
    const decoded = verifyToken(token);

    req.user = await User.findById(decoded.id);

    // if (!req.user) {
    //   return next(new ErrorResponse('No user found with this id', 404));
    // }

    next();
  } catch (err) {
    return
    //  next(new ErrorResponse('Not authorized 1to access this route', 401));
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return 
      // next(
      //   new ErrorResponse(
      //     `User role ${req.user.role} is not authorized to access this route`,
      //     403
      //   )
      // );
    }
    next();
  };
};