// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to parse JSON bodies
router.use(express.json());

// User signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.status(201).send(user);
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Get user's favorite properties
router.get('/:userId/favorites', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate('favorites');
  res.status(200).send(user.favorites);
});

module.exports = router;