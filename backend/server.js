// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const mongoUri = process.env.MONGO_URI; // 'mongodb://localhost:27017/dreamhouse';
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());

// CORS Middleware enablement - In case I decide to host the frontend on a different domain
app.use(cors());

// MongoDB Connection
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: dbUser,
  pass: dbPass,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

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

// Define Models
const Notification = mongoose.model('Notification', notificationSchema);
const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema);
const Property = mongoose.model('Property', propertySchema);

// Routes
const authRoutes = require('./routes/auth');
const selectionRoutes = require('./routes/selection');
const amenitiesRoutes = require('./routes/amenities');
const locationRoutes = require('./routes/location');
const userRoutes = require('./routes/users');
app.use('/api/auth', authRoutes);
app.use('/api/selection', selectionRoutes);
app.use('/api/amenities', amenitiesRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/users', userRoutes);

// Notification and Message Routes
app.post('/api/notifications', async (req, res) => {
  const notification = new Notification(req.body);
  try {
    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.send(notifications);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/notifications/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).send({ message: 'Notification not found' });
    }
    res.send({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/messages', async (req, res) => {
  const message = new Message(req.body);
  try {
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/messages/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.params.userId });
    res.send(messages);
  } catch (error) {
    res.status(500).send(error);
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
    res.status(500).send(error);
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
    res.status(500).send(error);
  }
});

// Property Routes
app.post('/api/properties', async (req, res) => {
  const property = new Property(req.body);
  try {
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.send(properties);
  } catch (error) {
    res.status(500).send(error);
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
    res.status(500).send(error);
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
    res.status(400).send(error);
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
    res.status(500).send(error);
  }
});

// AI Recommendations Route
app.post('/api/ai/recommendations', async (req, res) => {
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
    res.status(500).send(error);
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