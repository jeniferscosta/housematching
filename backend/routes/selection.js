const express = require('express');
const router = express.Router();
const Selection = require('../models/Selection');

// Save user selections
router.post('/save', async (req, res) => {
  const { userId, selectedProperties } = req.body;

  if (!userId || !selectedProperties || !Array.isArray(selectedProperties)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    const newSelection = new Selection({
      userId,
      selectedProperties,
    });

    await newSelection.save();
    res.status(200).json({ message: 'Properties saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save properties' });
  }
});

module.exports = router;