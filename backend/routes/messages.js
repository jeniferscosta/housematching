const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Create a new message
router.post('/', async (req, res) => {
  const message = new Message(req.body);
  try {
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Get all messages for a user
router.get('/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.params.userId });
    res.send(messages);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// Delete a message by ID
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).send({ message: 'Message not found' });
    }
    res.send({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;