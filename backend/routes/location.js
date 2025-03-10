const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Get properties by location
router.get('/:location', async (req, res) => {
  try {
    const properties = await Property.find({ location: req.params.location });
    res.status(200).send(properties);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Add more location-related routes as needed

module.exports = router;