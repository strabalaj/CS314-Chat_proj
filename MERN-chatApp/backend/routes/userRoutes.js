const express = require('express');
const { newUser, exsistingUser, everyUser } = require('../controllers/userControllers');
const { protect } = require ("../middleware/authorizationMid")

const router = express.Router()

//API to user register
router.route("/").post(newUser)

//login API
router.post('/login', exsistingUser)

//API to user searching API
router.route('/').get(protect, everyUser)

module.exports = router;