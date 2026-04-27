const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.use(authController.protect);

router.get('/me', userController.getMe);
router.get('/all-users', userController.getAllUsers);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.get('/my-team', userController.getMyTeam);
router.post('/add-team', userController.addToMyTeam);
router.delete('/remove-team', userController.deleteFromMyTeam);

module.exports = router;
