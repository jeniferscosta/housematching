const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// Register user
router.post('/register', async (req, res) => {
  const { fullName, email, password, telephone } = req.body;

  if (!fullName || !email || !password || !telephone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      telephone,
    });

    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in user' });
  }
});

// Save user information from OTP verification
router.post('/otp-verify', async (req, res) => {
  const { fullName, email, telephone } = req.body;

  if (!fullName || !email || !telephone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        fullName,
        email,
        telephone,
      });

      await user.save();
    }

    res.status(200).json({ message: 'User verified successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify user' });
  }
});

module.exports = router;