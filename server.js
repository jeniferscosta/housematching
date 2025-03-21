const express = require('express');
const path = require('path');
const { createDevServerMiddleware } = require('@expo/dev-server');
const { TerminalReporter } = require('metro');
const app = express();
let port = process.env.PORT || 3006;

console.log("Starting server from root directory");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle the root route
app.get('/', (req, res) => {
  console.log("Handling root route");
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
    port += 1;
    app.listen(port, () => {
      console.log(`Port in use, now running on port ${port}`);
    });
  } else {
    console.error(`Server error: ${err.message}`);
  }
});

const ExpoMetroConfig = require('./metro.config.cjs');

async function runMetroDevServerAsync() {
    const metroConfig = await ExpoMetroConfig.loadAsync();
    const { middleware, attachToServer } = createDevServerMiddleware({
        port: 8081,
        watchFolders: metroConfig.watchFolders,
        reporter: new TerminalReporter(),
        config: metroConfig,
    });

    const server = require('http').createServer(app);
    attachToServer(server);

    // Sanitize the header value
    server.on('request', (req, res) => {
        const originalSetHeader = res.setHeader;
        res.setHeader = function (name, value) {
            if (name === 'X-React-Native-Project-Root') {
                value = value.replace(/[^a-zA-Z0-9-_\/]/g, '');
            }
            originalSetHeader.call(this, name, value);
        };
    });

    server.listen(8081, () => {
        console.log('Metro server is running on port 8081');
    });
}

// Call the function to start the server
runMetroDevServerAsync().catch(error => {
    console.error('Failed to start Metro server:', error);
});
