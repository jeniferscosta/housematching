const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');

// Add a property to favorites
router.post('/:userId/favorites/:propertyId', async (req, res) => {
  const { userId, propertyId } = req.params;
  const user = await User.findById(userId);
  if (!user.favorites.includes(propertyId)) {
    user.favorites.push(propertyId);
    await user.save();
  }
  res.status(200).send(user);
});

// Remove a property from favorites
router.delete('/:userId/favorites/:propertyId', async (req, res) => {
  const { userId, propertyId } = req.params;
  const user = await User.findById(userId);
  user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
  await user.save();
  res.status(200).send(user);
});

// Get user's favorite properties
router.get('/:userId/favorites', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate('favorites');
  res.status(200).send(user.favorites);
});

module.exports = router;