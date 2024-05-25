const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/message_model");
const User = require("../models/user_model");
const Chat = require("../models/chat_model");

//send single or group chat message 
const send_message = expressAsyncHandler(async (req, res) => {
    try {
        const { message_content, chatID } = req.body;

        if (!message_content || !chatID) {
            return res.status(400).json({ message: "Both message_content and chatID are required." });
        }

        // Create a new message
        const new_message = {
            sender: req.user._id,
            message: message_content,
            chat: chatID,
        };

        // Save the new message
        const message = await Message.create(new_message);

        // Populate message details
        await message.populate("sender", "name");
        await message.populate("chat");
        await User.populate(message, {
            path: "chat.users",
            select: "name username",
        });

        // Update chat with latest message
        await Chat.findByIdAndUpdate(chatID, { latestMessage: message });

        // Return the created message
        res.json(message);
    } catch (error) {
        // Handle errors
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//to get messge histroy
const message_history = expressAsyncHandler(async (req, res) => {
    try {
        const history = await Message.find({ chat: req.params.chatID })
            .populate("sender", "name username")
            .populate("chat");
        res.json(history);
    } catch (error) {
        console.error("Error fetching message history:", error);
        res.status(500).json({ history: "Internal Server Error" });
    }
});


module.exports = {send_message, message_history};