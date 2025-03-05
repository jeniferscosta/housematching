const express = require('express');
const router = express.Router();
const Amenities = require('../models/Amenities');

// Save user amenities
router.post('/save', async (req, res) => {
  const { userId, priceRange, totalAreaRange, locationRange, bedrooms, bathrooms, parkingSpots, toilets, selectedFacilities } = req.body;

  if (!userId || !priceRange || !totalAreaRange || !locationRange || !bedrooms || !bathrooms || !parkingSpots || !toilets || !selectedFacilities) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    const newAmenities = new Amenities({
      userId,
      priceRange,
      totalAreaRange,
      locationRange,
      bedrooms,
      bathrooms,
      parkingSpots,
      toilets,
      selectedFacilities,
    });

    await newAmenities.save();
    res.status(200).json({ message: 'Amenities saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save amenities' });
  }
});

module.exports = router;