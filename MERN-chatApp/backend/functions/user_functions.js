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
    try {
        const searchTerm = req.query.search;

        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required." });
        }

        // Search users by username
        const users = await User.find({ username: searchTerm });

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with the provided username." });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error searching for users:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = {new_user, exsisting_user, search_users}