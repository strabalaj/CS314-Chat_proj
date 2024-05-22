const express = require("express");
const { protect } = require("../middleware/authorization");
const { send_message, message_history } = require("../functions/message_functions");

const router = express.Router();

/* API for sending the message */
router.route('/send_message').post(protect, send_message);

/* API to fetch all messages that pertain to user! */
router.route('/:chatID').get(protect, message_history);

module.exports = router;
