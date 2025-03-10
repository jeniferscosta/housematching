require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        if (error.name === 'MongooseServerSelectionError') {
            console.error('Ensure your IP address is whitelisted in your MongoDB Atlas cluster.');
        }
        process.exit(1);
    }
};

module.exports = connectDB;