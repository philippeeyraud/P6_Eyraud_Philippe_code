const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const password = require("../middleware/password");

//pour intercepter les req post on crée une nouvelle instance de notre modele user.
router.post('/signup',password,authCtrl.signup); 
router.post('/login',authCtrl.login); 

module.exports = router;