const express = require('express');
const { new_user, exsisting_user, search_users } = require('../functions/user_functions');
const { protect } = require ("../middleware/authorization")

const router = express.Router()

//API to user register
router.route("/register").post(new_user)

//login API
router.post('/login', exsisting_user)

//API to user searching API
router.route('/search').get(protect, search_users)

module.exports = router;