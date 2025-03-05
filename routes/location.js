const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Save user location
router.post('/save', async (req, res) => {
  const { userId, locationInfo } = req.body;

  if (!userId || !locationInfo) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    const newLocation = new Location({
      userId,
      locationInfo,
    });

    await newLocation.save();
    res.status(200).json({ message: 'Location saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save location' });
  }
});

module.exports = router;