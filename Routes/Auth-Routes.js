const express = require('express');
const router = express.Router();
const Auth_Controller = require('../Controllers/Auth-Controller');



router.post('/signup', Auth_Controller.register);
router.post('/signin', Auth_Controller.login);



module.exports = router;