const db = require("../config/db");

class Message {
  // Create a new message
  static async create(sender_id, receiver_id, content, attachment_path = null, project_id = null) {
    const [result] = await db.query(
      `INSERT INTO messages (sender_id, receiver_id, project_id, content, attachment_path)
       VALUES (?, ?, ?, ?, ?)`,
      [sender_id, receiver_id, project_id, content, attachment_path]
    );
    return result.insertId;
  }

  // Get conversation between two users
  static async getConversation(user1, user2) {
    const [rows] = await db.query(
      `SELECT m.*, u1.full_name AS sender, u2.full_name AS receiver
       FROM messages m
       JOIN users u1 ON m.sender_id = u1.user_id
       JOIN users u2 ON m.receiver_id = u2.user_id
       WHERE (m.sender_id = ? AND m.receiver_id = ?)
          OR (m.sender_id = ? AND m.receiver_id = ?)
       ORDER BY m.created_at ASC`,
      [user1, user2, user2, user1]
    );
    return rows;
  }

  // Patch message content (only sender can do it)
  static async patchMessage(message_id, sender_id, newContent) {
    const [result] = await db.query(
      `UPDATE messages 
       SET content = ?
       WHERE message_id = ? AND sender_id = ?`,
      [newContent, message_id, sender_id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Message;
