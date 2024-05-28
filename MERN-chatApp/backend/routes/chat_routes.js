const express = require("express");
const { protect } = require("../middleware/authorization");
const { access_chat, retrieve_user_chats, create_group_chat, enlarge_group_chat , remove_from_group_chat} = require("../functions/chat_functions");

const router = express.Router();

/* API to create single chat */
router.route('/new_single_chat').post(protect, access_chat);

/* API to gets chat history for user */
router.route('/history').get(protect, retrieve_user_chats);

/* API to create group chat */
router.route('/new_group_chat').post(protect, create_group_chat);

/* API to remove from group */
router.route('/remove_from_group').put(protect, remove_from_group_chat);

/* API to add to group */
router.route('/enlarge_group_chat').put(protect, enlarge_group_chat);

/* add API function four Chat admin to kick a user memeber from group 
when user violates user terms of agreements 
totaly dude*/


module.exports = router;