const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const User = require('../models/user');
const axios = require('axios');

const JWT_SECRET = 'your_jwt_secret'; // Use a strong secret key in production
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // Use environment variable


//Authentication controller - register and verify email

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
		
		// Validate CAPTCHA
		const captchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=YOUR_SECRET_KEY&response=${captchaToken}`);
        if (!captchaResponse.data.success) {
            return res.status(400).send('Invalid CAPTCHA');
        }

        // Validate email and password length
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }
        if (email.length > 100) {
            return res.status(400).send('Email is too long');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).send('Invalid email format');
        }    
        if (password.length < 8 || password.length > 50) {
            return res.status(400).send('Password must be between 8 and 50 characters');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already registered');
        }
        const hashedPassword = await hashPassword(password);

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const user = new User({ email, password: hashedPassword, verificationToken });
        await user.save();

        const verificationUrl = `http://localhost:3000/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
        await sendEmail(email, 'Email Verification', `Verify your email using this link: ${verificationUrl}`);
        res.status(201).send('User registered. Please check your email to verify your account.');
        
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token, email } = req.query;
        if (!token || !email) {
            return res.status(400).send('Token and email are required');
        }
        const user = await User.findOne({ email: decodeURIComponent(email), verificationToken: token });
        if (!user) {
            return res.status(400).send('Invalid or expired verification token');
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).send('Email verified successfully');
    } catch (error) {
		console.error(error);
        res.status(500).send('Error verifying email');
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password');
        }
        if (!user.isVerified) {
            return res.status(400).send('Email not verified');
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
};

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

// In-memory store for reset tokens (use a database in production)
const resetTokens = {};

const requestPasswordReset = async (req, res) => {
	try{
		const { email } = req.body;
		// Generate a reset token
		const resetToken = crypto.randomBytes(32).toString('hex');
		// Store the token with the user's email (use a database in production)
		resetTokens[email] = resetToken;
		// Send the reset token via email
		const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}&email=${email}`;
		await sendEmail(email, 'Password Reset', `Reset your password using this link: ${resetUrl}`);
		res.status(200).send('Password reset email sent');
	} catch (error) {
        res.status(500).send('Error requesting password reset');
    }
};

const resetPassword = async (req, res) => {
	try{	
		const { token, email, newPassword } = req.body;
		// Verify the reset token
		if (resetTokens[email] !== token) {
			return res.status(400).send('Invalid or expired reset token');
		}
		// Hash the new password
		const hashedPassword = await hashPassword(newPassword);
		// Update the user's password in the database (pseudo code)
		// await User.updateOne({ email }, { password: hashedPassword });
		// Remove the reset token
		const user = await User.findOne({ email: decodeURIComponent(email) });
        if (!user) {
            return res.status(400).send('User not found');
        }
        user.password = hashedPassword;
        await user.save();
        delete resetTokens[email];
		res.status(200).send('Password has been reset');
	} catch (error) {
        res.status(500).send('Error resetting password');
    }
};

module.exports = {
	register,
    verifyEmail,
	login,
    authenticate,
	requestPasswordReset,
	resetPassword,
};