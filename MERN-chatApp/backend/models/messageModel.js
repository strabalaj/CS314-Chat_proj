const mongoose = require('mongoose')

const messageModel = mongoose.Schema({
    //Name, ID of sender
    sender : {type:mongoose.Schema.Types.ObjectId, ref: "User"}, 
    //contents of message 
    content: {type: String, trim: true}, 
    //reference to chat for which it belongs to
    chat: {type:mongoose.Schema.Types.ObjectId, ref: "Chat"}
}, {timestamps: true, });

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
