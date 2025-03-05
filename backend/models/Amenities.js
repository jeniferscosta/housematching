const mongoose = require('mongoose');

const AmenitiesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  priceRange: {
    type: String,
    required: true,
  },
  totalAreaRange: {
    type: String,
    required: true,
  },
  locationRange: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  parkingSpots: {
    type: Number,
    required: true,
  },
  toilets: {
    type: Number,
    required: true,
  },
  selectedFacilities: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Amenities', AmenitiesSchema);