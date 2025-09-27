const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get('/', (req, res) => {
  res.send('Hello there');
});

const users = {};

io.on("connection", (socket) => {
  console.log('A user connected: ', socket.id);

  socket.on('register', (username) => {
    users[username] = socket.id;
    console.log('Registered user:', username, 'ID:', socket.id);
  });

  socket.on("chatMessage", ({ to, text, from }) => {
    const targetSocketId = users[to];
    if (targetSocketId) {
      // Send to the target client
      io.to(targetSocketId).emit("privateMessage", { user: from, text });
    }
    // Echo back to sender
    socket.emit("privateMessage", { user: from, text });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
