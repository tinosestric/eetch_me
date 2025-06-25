const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// In-memory user profiles (for demo)
const users = {};

// In-memory challenges (for demo)
const challenges = [
  'Plan a surprise date night for your partner.',
  'Send a flirty message during the day.',
  'Try a new activity together this week.',
  'Share a fantasy with your partner.',
  'Give your partner a genuine compliment.'
];

// Get or create user profile
app.post('/api/profile', (req, res) => {
  const { telegramId } = req.body;
  if (!telegramId) return res.status(400).json({ error: 'telegramId required' });
  if (!users[telegramId]) {
    users[telegramId] = { telegramId, challengesCompleted: 0 };
  }
  res.json(users[telegramId]);
});

// Get a random challenge
app.get('/api/challenge', (req, res) => {
  const challenge = challenges[Math.floor(Math.random() * challenges.length)];
  res.json({ challenge });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
