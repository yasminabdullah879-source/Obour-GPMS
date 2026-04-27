const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

// 1) مسارات مش محتاجة تسجيل دخول (Public)
router.post('/register', authController.register);
router.post('/login', authController.login);

// 2) كل اللي جاي بعد السطر ده محتاج تسجيل دخول (Protected)
router.use(authController.protect);

router.get('/me', userController.getMe);
router.get('/all-users', userController.getAllUsers);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// مسارات الفريق
router.get('/my-team', userController.getMyTeam);
router.post('/add-team', userController.addToMyTeam);
router.delete('/remove-team', userController.deleteFromMyTeam);

module.exports = router;