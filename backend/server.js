// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const mongoUri = process.env.MONGO_URI; // 'mongodb://localhost:27017/dreamhouse';
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());

// CORS Middleware enablement - In case I decide to host the frontend on a different domain
app.use(express.json());
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

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});