const express = require('express');

const userController = require('../controllers/user-controller');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/users', verifyToken, userController.getAllUsers);

router.post('/register', userController.createUser);

router.post('/login', userController.login);

router.post('/update-user', verifyToken, userController.updateUserInformation);

router.post('/change-password', verifyToken, userController.updatePassword);

module.exports = router;