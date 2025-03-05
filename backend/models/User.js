// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telephone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  profilePicture: { type: String, required: true },
  propertyTypes: { type: [String], default: [] },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  priceRange: { type: String },
  areaRange: { type: String },
  distanceRange: { type: String },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  parkingSpots: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// backend/models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  images: [String],
  contactInfo: String
});

module.exports = mongoose.model('Property', propertySchema);