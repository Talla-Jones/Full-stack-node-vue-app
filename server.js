// server.js
const http = require("http");
const { Server } = require("socket.io");
const app = require("./src/app");
const messageSocket = require("./src/sockets/messageSocket");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// attach Socket.IO events
messageSocket(io);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
