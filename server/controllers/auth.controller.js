const User = require('../models/User.model');
const { generateToken } = require('../config/jwt');
const sendEmail = require('../services/email.service');
const ErrorResponse = require('../utils/ErrorResponse');
const {verifyToken} = require('../config/jwt')

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Хранилище кодов подтверждения (временное, для разработки)
const verificationCodes = new Map();
exports.register = async (req, res, next) => {
  const {
    name,
    email,
    phone,
    password,
    company,
    referrer,
    role = 'investor',
    newsletterSubscription = false,
  } = req.body;

  try {
    // Проверка обязательных полей
    if (!name || !email || !phone || !password) {
      return next(new ErrorResponse('Please provide all required fields', 400));
    }

    // Проверка существующего пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse('User already exists', 400));
    }

    // Создание пользователя
    const user = await User.create({
      name,
      email,
      phone,
      password,
      company,
      referrer,
      role,
      newsletterSubscription,
    });

    // Генерация токена
    const token = generateToken(user._id, user.role);

    // Отправка email для верификации
    try {
      const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${token}`;
      const message = `Please verify your email by clicking on the link: \n\n ${verificationUrl}`;
      
      await sendEmail({
        email: user.email,
        subject: 'Email Verification',
        message,
      });
    } catch (emailErr) {
      console.error('Email sending error:', emailErr);
      // Не прерываем регистрацию из-за ошибки email
    }

    // Ответ без пароля
    user.password = undefined;

    res.status(201).json({
      success: true,
      token,
      data: user
    });

  } catch (err) {
    console.error('Registration error:', err);
    next(err);
  }
};
// @desc    Login user and send verification email
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Пожалуйста, укажите email и пароль'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Неверные учетные данные'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Неверные учетные данные'
      });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Ваш аккаунт заблокирован. Свяжитесь с поддержкой.'
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      user
    });

  } catch (err) {
    console.error('Ошибка входа:', err);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при попытке входа'
    });
  }
};

// @desc    Verify login via email link
// @route   GET /api/auth/verify-login/:token
// @access  Public
exports.verifyLogin = async (req, res, next) => {
  const { token } = req.params;

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse('Invalid token', 400));
    }

    // Generate a new token for the user now that login is verified
    const newToken = generateToken(user._id, user.role);

    // You might want to update some user fields here, like lastLoginVerifiedAt

    res.status(200).json({
      success: true,
      token: newToken,
      message: 'Login successfully verified',
    });
  } catch (err) {
    next(err);
  }
};
// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse('No user with that email', 404));
    }

    // Generate reset token
    const resetToken = generateToken(user._id, user.role);

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Token',
      message,
    });

    res.status(200).json({
      success: true,
      message: 'Email sent',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse('Invalid token', 400));
    }

    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (err) {
    next(err);
  }
};