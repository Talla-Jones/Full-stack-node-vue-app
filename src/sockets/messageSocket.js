const Message = require("../Models/messageModel");

function messageSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join private room per user
    socket.on("join", (userId) => {
      socket.join(userId.toString());
      console.log(`User ${userId} joined room ${userId}`);
    });

    // Send a new message
    socket.on("sendMessage", async (data) => {
      const { sender_id, receiver_id, content, attachment_path, project_id } = data;

      try {
        const messageId = await Message.create(sender_id, receiver_id, content, attachment_path, project_id);

        const newMessage = {
          message_id: messageId,
          sender_id,
          receiver_id,
          content,
          attachment_path,
          project_id,
          created_at: new Date()
        };

        // Emit to receiver
        io.to(receiver_id.toString()).emit("receiveMessage", newMessage);
        // Confirm to sender
        socket.emit("messageSent", newMessage);
      } catch (err) {
        console.error(err);
        socket.emit("error", { error: "Failed to send message" });
      }
    });

    // Patch/edit a message
    socket.on("patchMessage", async (data) => {
      const { message_id, sender_id, newContent } = data;

      try {
        const success = await Message.patchMessage(message_id, sender_id, newContent);

        if (success) {
          const patchedMessage = { message_id, sender_id, content: newContent };

          // Notify sender & receiver
          io.emit("messagePatched", patchedMessage);
        } else {
          socket.emit("error", { error: "Not allowed to patch this message" });
        }
      } catch (err) {
        console.error(err);
        socket.emit("error", { error: "Something went wrong" });
      }
    });
  });
}

module.exports = messageSocket;
