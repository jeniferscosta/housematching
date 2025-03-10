const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = mongoose.model('Message', messageSchema);