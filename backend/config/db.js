require('dotenv').config();
const mongoose = require('mongoose');

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: dbUser,
  pass: dbPass,
  host: dbHost,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));