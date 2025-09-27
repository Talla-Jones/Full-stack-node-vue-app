const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/", messageController.sendMessage);             // send message
router.get("/:user1/:user2", messageController.getConversation);  // get conversation
router.patch("/:message_id", messageController.patchMessage);     // edit message

module.exports = router;
