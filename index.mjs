/**
 * @format
 */
import dotenv from 'dotenv';
import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App.js'; // Ensure App.js uses ESM (with import/export)
import { connectDB } from './config/db.mjs'; // Ensure db.js uses ESM
import appConfig from './app.json' assert { type: "json" }; // Needed for JSON imports in ESM

// Load environment variables
dotenv.config();
console.log('Environment variables loaded from .env file');

// Connect to Database
connectDB();

// Register React Native App
const appName = appConfig.name;
AppRegistry.registerComponent(appName, () => App);

// Access environment variables
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;

// Log environment variables (Remove this in production)
console.log(`Database Host: ${dbHost}`);
console.log(`Database User: ${dbUser}`);
console.log(`Database Password: ${dbPass}`);
console.log(`Server Port: ${port}`);
console.log(`Secret Key: ${secretKey}`);
