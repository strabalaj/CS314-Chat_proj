const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user_model");
const generate_jwt = require("../config/generate_jwt");

const new_user = expressAsyncHandler(async (req, res) => {
    const { name, username, password } = req.body;
    if(!name || !username || !password) {
        throw new Error("Please enter all the fields")
    }
    const if_User_already_exsists = await User.findOne({ username });
    if(if_User_already_exsists) {
        throw new Error("User already exists");
    }
    const user = await User.create ({
        name, 
        username, 
        password,
    });

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            token:generate_jwt(user._id), 
        });
    } else {
        throw new Error("Failed to create user")
    }
});

const exsisting_user = expressAsyncHandler(async (req, res) => {
    const { username, password} = req.body;

    //find user
    const user = await User.findOne({username});
    if(user && (await user.checkPassword(password))) {
        res.json({
           _id: user._id,
            name: user.name,
            username: user.username,
            token:generate_jwt(user._id),           
        })
    } else {
        throw new Error("Invalid username or Password")
    }

}); 

// /api/user?search=
//using queries instead of a post request!
const search_users = expressAsyncHandler(async (req, res) => {
    const key = req.query.search? {
        
        $or: [
            {name : { $regex: req.query.search, $options: "i" } },
            {username :  {$regex: req.query.search, $options: "i" } },
        ]
    }:  {};
    //console.log(key)
    //const users = await User.find(key);
    const users = await User.find(key).find({_id: {$ne: req.user._id}});
    res.send(users);
});

module.exports = {new_user, exsisting_user, search_users}