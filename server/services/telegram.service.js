const axios = require('axios');
const ErrorResponse = require('../utils/errorResponse');

const sendTelegramNotification = async (chatId, message) => {
  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
      }
    );
  } catch (err) {
    console.error(err);
    throw new ErrorResponse('Telegram notification could not be sent', 500);
  }
};

module.exports = {
  sendTelegramNotification,
};