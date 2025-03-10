const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    profilePicture: String,
    userName: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

module.exports = Notification;