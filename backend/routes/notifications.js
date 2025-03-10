const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a new notification
router.post('/', async (req, res) => {
  const notification = new Notification(req.body);
  try {
    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.send(notifications);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a notification by ID
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).send({ message: 'Notification not found' });
    }
    res.send({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;