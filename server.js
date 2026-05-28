require('dotenv').config();
const express = require('express');
const path = require('path');
const bot = require('./bot'); // bot.js yahan se import ho raha hai

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Webhook route
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;

// Server start hone ke baad Webhook register karein
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server is running on port ${PORT}`);
  
  try {
    const url = process.env.RAILWAY_URL;
    await bot.setWebHook(`${url}/bot${process.env.BOT_TOKEN}`);
    console.log(`Webhook set to: ${url}`);
  } catch (error) {
    console.error("Webhook setup failed:", error);
  }
});
