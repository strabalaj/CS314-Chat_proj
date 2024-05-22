const jwt = require("jsonwebtoken");
const User = require("../models/user_model.js");
const expressAsyncHandler = require("express-async-handler");

/*
This middleware enables the user search within userControler.js to 
actiall work, headers are sent with a Bearer token and we use autorization.split to take 
the token and verify token, find the user and return without password
*/

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SPECIAL_VALUE);

      // Fetch user from database
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      // Pass the error to the Express error handling middleware
      return next(error);
    }
  }

  // No token provided
  if (!token) {
    return next(new Error("Not authorized, no token"));
  }
});

module.exports = { protect };
