const nodemailer = require('nodemailer');
const ErrorResponse = require('../utils/ErrorResponse');


const sendEmail = async (to, link) => {
  try {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Login Verification for ' + process.env.API_URL,
      text: '',
      html: `
          <div>
              <h1>To complete your login, please verify by clicking the link below</h1>
              <a href="${link}">${link}</a>
              <p>If you didn't attempt to login, please secure your account immediately.</p>
          </div>
      `
  });
  } catch (err) {
    console.error('Email sending error:', err);
    throw new ErrorResponse('Email could not be sent', 500);
  }
};

module.exports = sendEmail;