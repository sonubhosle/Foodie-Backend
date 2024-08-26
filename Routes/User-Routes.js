const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/Authenticate');


const User_Controller = require('../Controllers/User-Controller');

router.get('/profile', authenticate, User_Controller.getUserProfile);
router.get('/all-users', authenticate, User_Controller.getAllUser);


module.exports = router;