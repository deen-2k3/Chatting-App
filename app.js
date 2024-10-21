const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Serve static files from the public directory
app.use(express.static(path.resolve(__dirname, 'public')));

// Serve the index.html file on the root route
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Set up WebSocket connection
io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for 'chat message' events
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // You can also broadcast the message to other clients here
    io.emit('chat message', msg); // Broadcast the message to all clients
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
