const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();


router.get('/login', userController.getUserLogin);
router.post('/login', userController.postUserLogin);
router.get('/register', userController.getUserRegister);
router.post('/register', userController.postUserRegister);







module.exports = router;