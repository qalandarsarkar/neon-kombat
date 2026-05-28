require('dotenv').config();
const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(express.json());

// Static Files Serve Karein (Frontend auto-host ho jayega)
app.use(express.static(path.join(__dirname, 'public')));

const token = process.env.BOT_TOKEN;
const isProduction = process.env.NODE_ENV === 'production';

let bot;

if (isProduction) {
  // Production (Railway) mode mein bina polling ke chalega
  bot = new TelegramBot(token, { polling: false });
  bot.setWebHook(`${process.env.RAILWAY_URL}/bot${token}`);
} else {
  // Local PC par test karne ke liye auto-polling on ho jayegi
  bot = new TelegramBot(token, { polling: true });
  console.log("Bot started in Local Polling Mode...");
}

// Telegram Webhook Endpoint
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Bot /start Command Logic
bot.onText(/\/start/, (msg) => {
  const url = isProduction ? process.env.RAILWAY_URL : 'http://localhost:8080';
  
  bot.sendMessage(msg.chat.id, `🚀 *Welcome to Neon Kombat, ${msg.from.first_name}!* \n\nTap the button below to start earning neon tokens directly inside Telegram.`, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎮 PLAY NEON KOMBAT", web_app: { url: url } }]
      ]
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});