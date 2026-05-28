require('dotenv').config();
const express = require('express');
const path = require('path');
const bot = require('./bot'); // Yahan bot import ho raha hai

const app = express();
app.use(express.json());

// Public folder serve karein
app.use(express.static(path.join(__dirname, 'public')));

// Webhook route
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
