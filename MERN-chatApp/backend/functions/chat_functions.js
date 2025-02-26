const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chat_model"); // Import the Chat model
const User = require("../models/user_model"); // Import the User model

/* creating / fetching one on one chat(s) */
const access_chat = expressAsyncHandler(async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID parameter not included with request" });
        }

        const currentUser = await User.findById(req.user._id, '-password');
        const otherUser = await User.findById(userId, '-password');

        if (!currentUser || !otherUser) {
            return res.status(404).json({ message: "One or both users not found" });
        }

        let chat = await Chat.findOne({
            if_group_chat: false,
            users: { $all: [req.user._id, userId] }
        });

        if (!chat) {
            chat = await Chat.create({
                chat_name: "Private Chat", 
                if_group_chat: false,
                users: [req.user._id, userId]
            });
        }

        chat = await Chat.populate(chat, { path: "users", select: "-password" });

        res.json(chat);
    } catch (error) {
        console.error("Error in createChat:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/* check which user is logged in and query for user in database
of users */
const retrieve_user_chats = expressAsyncHandler(async (req, res) => {
    try {
        let results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("group_admin", "-password")
            .populate("latest_message")
            .sort({ updatedAt: -1 });
        

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No chats found for the user" });
        }

        if (results && Array.isArray(results) && results.length > 0) {
            results = await User.populate(results, {
                path: "latest_message.sender",
                select: "name"
            });
        }

        return res.json(results);
    } catch (error) {
        console.error("Error in retrieve_user_chats:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

/*  takes in name of group and array of users to create group */
const create_group_chat = expressAsyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: "Missing a required field..." });
    }

    try {
        const users = JSON.parse(req.body.users);
        if (users.length < 3) {
            return res.status(400).json({ message: "More than two users are required to form a group chat!" });
        }

        // Add current user to the group
        users.push(req.user);

        // Create the group chat
        const group_chat = await Chat.create({
            chat_name: req.body.name,
            users: users,
            if_group_chat: true,
            group_admin: req.user._id // Assuming req.user has an _id property
        });

        // Fetch the created group chat
        const full_group_chat = await Chat.findOne({ _id: group_chat._id })
            .populate("users", "-password")
            .populate("group_admin", "-password");

        if (!full_group_chat) {
            return res.status(500).json({ message: "Error fetching group chat" });
        }

        res.json(full_group_chat);

    } catch (error) {
        //console.error("Error in create_group_chat:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/* takes in a name to add to current group user is an admin of */
const enlarge_group_chat = expressAsyncHandler(async (req, res) => {
    const { chatID, userID } = req.body;
    
    try {
        const update_chat = await Chat.findByIdAndUpdate(
            chatID,
            { $push: { users: userID } },
            { new: true }
        ).populate("users", "-password").populate("group_admin", "-password");
        
        if (!update_chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        
        res.json(update_chat);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/* takes in a name to remove from a group (only group admin can do this) */
const remove_from_group_chat = expressAsyncHandler(async (req, res) => {
    try {
        const { chatID, userID } = req.body;
        const removed_member = await Chat.findByIdAndUpdate(
            chatID,
            { $pull: { users: userID } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("group_admin", "-password");
        
        if (!removed_member) {
            throw new Error("Not found!");
        } else {
            res.json(removed_member);
        }
    } catch (error) {
        console.error("Error in remvoing person from group:", error);
        res.status(500).json({ message: error.message });
    }
});

/* delete chatroom */
const delete_chat = expressAsyncHandler(async (req, res) => {
 try {
        const { chatID } = req.body;
        const chat_to_remove = await Chat.findById(chatID)

        if (!chat_to_remove){
            throw new Error("Chatroom not found")
        }
        await Chat.findByIdAndDelete(chatID);
        return res.json({message : "Group chat was deleted successfully!"})
       
    } catch (error) {
        console.error("Error deleting chatroom:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

module.exports = { access_chat, retrieve_user_chats , create_group_chat, enlarge_group_chat, remove_from_group_chat, delete_chat};
