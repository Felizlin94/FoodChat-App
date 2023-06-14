const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

const allMessages = [];

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send all stored messages to the newly connected client
  socket.emit("allMessages", allMessages);

  // Handle 'message' event
  socket.on("message", (newMessage) => {
    console.log("Received message:", newMessage);
    console.log("allMessages:", allMessages);

    // Add the new message to the array
    allMessages.push(newMessage);

    // Broadcast the received message to all connected clients
    io.emit("message", newMessage);
  });

  // Handle 'disconnect' event
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Route to get allMessages
app.get("/messages", (req, res) => {
  res.json(allMessages);
});

// Start the server
const port = 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
