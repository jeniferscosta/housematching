const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');

// Add a property to favorites
router.post('/:userId/favorites/:propertyId', async (req, res) => {
  const { userId, propertyId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (!user.favorites.includes(propertyId)) {
      user.favorites.push(propertyId);
      await user.save();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Remove a property from favorites
router.delete('/:userId/favorites/:propertyId', async (req, res) => {
  const { userId, propertyId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get user's favorite properties
router.get('/:userId/favorites', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user.favorites);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;