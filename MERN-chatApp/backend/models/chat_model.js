
const mongoose = require('mongoose')

const chat_model = mongoose.Schema(
    {
        chat_name:{type:String, trim:true}, 
        if_group_chat: {type:Boolean,defaut: false}, 
        users:[{
            //contain ID to particular user 
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        ],

        latest_message: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        }, 
        group_admin: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    }, {timestamps: true, }
);

const Chat = mongoose.model("Chat", chat_model);

module.exports = Chat;


