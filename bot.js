require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

// Polling false taaki Railway par crash na ho
const bot = new TelegramBot(token, { polling: false });

// Webhook automatic Railway URL uthayega
bot.setWebHook(`${process.env.RAILWAY_URL}/bot${token}`);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `🚀 *Welcome to Neon Kombat!* \n\nGame khelne ke liye niche button par click karein.`, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎮 PLAY NEON KOMBAT", web_app: { url: process.env.RAILWAY_URL } }]
      ]
    }
  });
});

module.exports = bot;