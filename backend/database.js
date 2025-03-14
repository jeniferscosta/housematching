require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        if (error.name === 'MongooseServerSelectionError') {
            console.error('Ensure your IP address is whitelisted in your MongoDB Atlas cluster.');
        }
    }
};

// Basic route handler
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = connectDB;