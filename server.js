const express = require('express');
const path = require('path');
const app = express();
let port = process.env.PORT || 3006

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
