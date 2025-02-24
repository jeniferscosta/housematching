// backend/server.js
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorites');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/dreamhouse', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', favoriteRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});