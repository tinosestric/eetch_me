require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.TELEGRAM_BOT_TOKEN;
const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
const bot = new TelegramBot(token, { polling: true });

// Set bot commands for Telegram menu
bot.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'about', description: 'About eetch_bot' },
  { command: 'profile', description: 'View your profile' },
  { command: 'challenge', description: 'Get a new challenge' },
]);

// /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to eetch_bot! Type /about to learn more.');
});

// /about command
bot.onText(/\/about/, (msg) => {
  bot.sendMessage(msg.chat.id, 'eetch_bot: AI-powered, private romantic and sexual challenges for couples and groups—delivered via Telegram.');
});

// /profile command
bot.onText(/\/profile/, async (msg) => {
  try {
    const res = await axios.post(`${backendUrl}/api/user`, { telegramId: msg.from.id });
    bot.sendMessage(msg.chat.id, `Your profile: Challenges completed: ${res.data.challenges_completed || 0}`);
  } catch (e) {
    bot.sendMessage(msg.chat.id, 'Could not fetch profile.');
  }
});

// /challenge command
bot.onText(/\/challenge/, async (msg) => {
  try {
    const res = await axios.get(`${backendUrl}/api/challenge`);
    bot.sendMessage(msg.chat.id, `Your challenge: ${res.data.challenge}`);
  } catch (e) {
    bot.sendMessage(msg.chat.id, 'Could not fetch challenge.');
  }
});

// Default reply for other messages
bot.on('message', (msg) => {
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, 'Hello! I am your eetch.me bot. Type /about to learn more.');
  }
});
