const express = require("express");
const { protect } = require("../middleware/authorizationMid");
const { accessChat, fetchChats, createGroupChat } = require("../controllers/chatControllers");

const router = express.Router();

/* API to create single chat */
router.route('/').post(protect, accessChat);

/* API to gets chat history for user */
router.route('/').get(protect, fetchChats);

/* API to create group chat */
router.route('/group').post(protect, createGroupChat);

/* API to remove from group */
//router.route('/groupremove').put(protect, removefromGroup);

/* API to add to group */
//router.route('/groupadd').post(protect, addToGroup);

module.exports = router;