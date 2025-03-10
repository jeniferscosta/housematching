// backend/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const { body, param, validationResult } = require('express-validator');
const connectDB = require('./database');
const User = require('./models/User');
const Property = require('./models/Property');
const Notification = require('./models/Notification');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// JWT Middleware
app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized access' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    next();
  }
});

// Test Route to Verify MongoDB Connection
app.get('/api/test', async (req, res) => {
  try {
    const testCollection = mongoose.connection.db.collection('test');
    const testDocument = await testCollection.findOne({});
    res.status(200).json({ message: 'MongoDB connection is working', document: testDocument });
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection failed', error: error.message });
  }
});

// Define Schemas
const notificationSchema = new mongoose.Schema({
  profilePicture: String,
  userName: String,
  message: String,
});

const messageSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  userName: String,
  profilePicture: String,
  status: String,
});

const propertySchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  price: Number,
  location: {
    latitude: Number,
    longitude: Number,
  },
});

// Import Routes
const authRoutes = require('./routes/auth');
const selectionRoutes = require('./routes/selection');
const amenitiesRoutes = require('./routes/amenities');
const locationRoutes = require('./routes/location');
const userRoutes = require('./routes/user');
const favoritesRoutes = require('./routes/favorites');
const notificationRoutes = require('./routes/notifications');
const messageRoutes = require('./routes/messages');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/selection', selectionRoutes);
app.use('/api/amenities', amenitiesRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/users', userRoutes);
app.use('/api', favoritesRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);

// AI Recommendations Route
app.post('/api/ai/recommendations', [
  body('query').isString().trim().escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { query } = req.body;
  try {
// Implement your AI logic here to process the query and fetch property recommendations
    // For simplicity, let's assume we fetch all properties that match the query in their title or description
    const recommendations = await Property.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    res.send(recommendations);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Notification and Message Routes
app.post('/api/notifications', [
  body('profilePicture').isString().trim().escape(),
  body('userName').isString().trim().escape(),
  body('message').isString().trim().escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const notification = new Notification(req.body);
  try {
    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.send(notifications);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete('/api/notifications/:id', [
  param('id').isMongoId()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

app.post('/api/messages', [
  body('userId').isMongoId(),
  body('message').isString().trim().escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const message = new Message(req.body);
  try {
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api/messages/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.params.userId });
    res.send(messages);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete('/api/messages/:id', async (req, res) => {
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

app.get('/api/users/:userId/status', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ status: user.status });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Property Routes
app.post('/api/properties', async (req, res) => {
  const property = new Property(req.body);
  try {
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.send(properties);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }
    res.send(property);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.put('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }
    res.send(property);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }
    res.send({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Socket.io Setup
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start Server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});