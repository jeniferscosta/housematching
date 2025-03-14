/**
 * @format
 */

require('dotenv').config();
console.log('Environment variables loaded from .env file');

import {AppRegistry} from 'react-native';
import App from './App';
import appName from './app.json';
import './config/db'; // Import the db.js file to establish the database connection

ReactDOM.render(<App />, document.getElementById('app-root'));

// Access environment variables
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;

// Example usage: logging the variables (remove this in production)
console.log(`Database Host: ${dbHost}`);
console.log(`Database User: ${dbUser}`);
console.log(`Database Password: ${dbPass}`);
console.log(`Server Port: ${port}`);
console.log(`Secret Key: ${secretKey}`);

AppRegistry.registerComponent(appName, () => App);
