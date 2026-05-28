const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

// Webhook mode mein polling false hona chahiye
const bot = new TelegramBot(token, { polling: false });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `🚀 *Welcome to Neon Kombat!* \n\nClick the button below to play the game.`, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎮 PLAY NEON KOMBAT", web_app: { url: process.env.RAILWAY_URL } }]
      ]
    }
  });
});

module.exports = bot;
