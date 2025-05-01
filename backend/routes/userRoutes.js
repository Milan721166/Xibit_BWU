const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/refresh',userController.tokenRefresh);
module.exports = router;
