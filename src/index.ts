// filepath: /Users/I868139/Library/CloudStorage/OneDrive-SAPSE/03. Personal/PUCRS - Pos graduação/HouseMatching/src/index.ts
import dotenv from 'dotenv';
import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App.js';
import { connectDB } from './config/db.js';
import appConfig from '../app.json';

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