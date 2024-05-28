const express = require('express');
const { new_user, exsisting_user, search_users, delete_user } = require('../functions/user_functions');
const { protect } = require ("../middleware/authorization")

const router = express.Router()

//API to user register
router.route("/register").post(new_user)

//login API
router.post('/login', exsisting_user)

//Delete user
router.delete('/delete/:userID', delete_user)

//API to user searching API
router.route('/').get(protect, search_users)

module.exports = router;