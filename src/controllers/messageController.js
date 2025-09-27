const Message = require("../Models/messageModel");

exports.sendMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, project_id, content, attachment_path } = req.body;
    const messageId = await Message.create(sender_id, receiver_id, content, attachment_path, project_id);
    res.status(201).json({ message: "Message sent", messageId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await Message.getConversation(user1, user2);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
};

exports.patchMessage = async (req, res) => {
  try {
    const { message_id } = req.params;
    const { sender_id, content } = req.body;

    const success = await Message.patchMessage(message_id, sender_id, content);

    if (!success) {
      return res.status(403).json({ error: "Not allowed to edit this message" });
    }

    res.json({ message: "Message patched successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to patch message" });
  }
};
