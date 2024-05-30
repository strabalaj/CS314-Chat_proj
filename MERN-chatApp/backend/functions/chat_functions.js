const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chat_model"); // Import the Chat model
const User = require("../models/user_model"); // Import the User model

/* creating / fetching one on one chat(s) */
const access_chat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "UserId parameter not included with request" });
    }
    try {
        let chat = await Chat.findOneAndUpdate(
            {
                if_group_chat: false,
                $or: [
                    { users: { $all: [req.user._id, userId] } },
                    { users: { $all: [userId, req.user._id] } }
                ],
            },
            {},
            { upsert: true, new: true }
        );

        if (!chat) {
            // If chat doesn't exist, create a new one
            chat = await Chat.create({
                if_group_chat: false,
                users: [req.user._id, userId],
                latest_message: null
            });
        }

        // Populate users and latest_message fields
        chat = await Chat.populate(chat, { path: "users", select: "-password" });
        chat = await Chat.populate(chat, { path: "latest_message" });

        res.json(chat); // Return the chat
    } catch (error) {
        console.error("Error in access_chat:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/* check which user is logged in and query for user in database
of users */
const retrieve_user_chats = expressAsyncHandler(async (req, res) => {
    try {
        const results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
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
const create_group_chat = expressAsyncHandler( async (req,res) => {
    if(!req.body.users || !req.body.name){
        return res.send({message: "Missing a required fields..."})
    }
    var users = JSON.parse(req.body.users);
    if(users.length < 2){
        return res.send({message: "More than two users are required to form group chat!"});
    }
    //now send current logged in user to group
    users.push(req.user);
    //and create the groupchat 
    try {
        const group_chat = await Chat.create({
            chat_mame: req.body.name,
            users: users, 
            if_group_chat: true,
            group_admin: req.user,
        });
        //now fetch groupchat and send back to user
        const full_group_chat = await Chat.findOne({_id: group_chat._id})
        .populate("users", "-password")
        .populate("group_admin", "-password");

        res.json(full_group_chat);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/* takes in a name to add to current group user is an admin of */
const enlarge_group_chat = expressAsyncHandler(async (req, res) => {
    const { chatID, userID } = req.body;
    console.log("Received chatID:", chatID);
    console.log("Received userID:", userID);
    
    try {
        const update_chat = await Chat.findByIdAndUpdate(
            chatID,
            { $push: { users: userID } },
            { new: true }
        ).populate("users", "-password").populate("group_admin", "-password");
        
        if (!update_chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        
        console.log("Updated chat:", update_chat);
        res.json(update_chat);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/* takes in a name to remove from a group (only group admin can do this) */
const remove_from_group_chat = expressAsyncHandler( async (req, res) => {
    const {chatID, userID } = req.body;
    const removed_member = await Chat.findByIdAndUpdate(
        chatID, {
            $pull: { users: userID},
           
        }, {new:true}
        )
        .populate("users", "-password")
        .populate("group_admin", "-password");
    if (!removed_member){
        throw new Error ("Not found!")
    }
    else{
        res.json(removed_member)
    }

});

module.exports = { access_chat, retrieve_user_chats , create_group_chat, enlarge_group_chat, remove_from_group_chat};
