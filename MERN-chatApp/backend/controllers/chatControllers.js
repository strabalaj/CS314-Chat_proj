const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel"); // Import the Chat model
const User = require("../models/userModel"); // Import the User model

/* creating / fetching one on one chat(s) */
const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId parameter not included with request");
        return res.status(400).json({ message: "UserId parameter not included with request" });
    }

    try {
        const isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        }).populate("users", "-password")
          .populate("latestMessage")
          .exec();

        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            // Create new chat
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };

            // Query and store in database
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.send(fullChat);
        }
    } catch (error) {
        console.error("Error accessing chat:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/* check which user is logged in and query for user in database
of users */
const fetchChats = expressAsyncHandler(async (req, res) => {
    try {
        Chat.find({users: {$elemMatch:{$eq: req.user._id}}})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt: -1})
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name",
                });
                res.send(results)
            })
    } catch (error) {}
});

/*  takes in name of group and array of users to create group */
const createGroupChat = expressAsyncHandler( async (req,res) => {
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
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users, 
            isGroupChat: true,
            groupAdmin: req.user,
        });
        //now fetch groupchat and send back to user
        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        res.json(fullGroupChat);

    } catch (error) {
        console.error("Error creating group chat:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = { accessChat, fetchChats , createGroupChat};
