const mongoose = require('mongoose')

const message_model = mongoose.Schema({
    //Name, ID of sender
    sender : {type:mongoose.Schema.Types.ObjectId, ref: "User"}, 
    //contents of message 
    message: {type: String, trim: true}, 
    //reference to chat for which it belongs to
    chat: {type:mongoose.Schema.Types.ObjectId, ref: "Chat"}
}, {timestamps: true, });

const Message = mongoose.model("Message", message_model);
module.exports = Message;
