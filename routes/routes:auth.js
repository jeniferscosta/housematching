//registration route
const express = require('express');
const router = express.Router();
const { requestPasswordReset, resetPassword } = require('../controllers/authController');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const User = require('../models/User'); 

router.post('/register', async (req, res) => {
	const { email, password } = req.body;
	const hashedPassword = await hashPassword(password);
	// Save email and hashedPassword to your database
	res.status(201).send('User registered');
});

//login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Retrieve hashedPassword from your database using the email
    const hashedPassword = 'retrieved_hashed_password_from_db';
    const match = await comparePassword(password, hashedPassword);
    if (match) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

router.post('/save-user-info', async (req, res) => {
    const { fullName, email, telephone, profilePicture } = req.body;
    try {
        const user = new User({
            fullName,
            email,
            telephone,
            profilePicture,
        });
        await user.save();
        res.status(201).send('User information saved');
    } catch (error) {
        res.status(500).send('Error saving user information');
    }
});

router.post('/save-user-preferences', async (req, res) => {
    const { email, propertyTypes } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.propertyTypes = propertyTypes;
            await user.save();
            res.status(201).send('User preferences saved');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error saving user preferences');
    }
});

router.post('/save-user-preferences', async (req, res) => {
    const { email, priceRange, areaRange, distanceRange, bedrooms, bathrooms, parkingSpots, totalRooms, amenities } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.priceRange = priceRange;
            user.areaRange = areaRange;
            user.distanceRange = distanceRange;
            user.bedrooms = bedrooms;
            user.bathrooms = bathrooms;
            user.parkingSpots = parkingSpots;
            user.totalRooms = totalRooms;
            user.amenities = amenities;
            await user.save();
            res.status(201).send('User preferences saved');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error saving user preferences');
    }
});

module.exports = router;

