const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

// 1) مسارات مفتوحة للجميع (Public Routes)
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// 2) حماية كل المسارات اللي جاية (Protected Routes)
// لازم نشيل الـ // عشان الـ Protect يشتغل
router.use(authController.protect);

// مسارات البروفايل الشخصي
router.get('/me', userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.patch('/updateMyPassword', authController.updatePassword); // ضفت لك مسار تغيير الباسورد
// لازم يكون مكتوب getMe مش get-me أو حاجة تانية
router.get('/getMe', authController.protect, authController.getMe);
// مسارات إدارة الفريق (Team Operations)
router.get('/my-team', userController.getMyTeam);
router.post('/add-team', userController.addToMyTeam);
router.delete('/remove-team/:memberId', userController.deleteFromMyTeam); // ضفت :memberId عشان الحذف يشتغل صح

// مسارات إدارية (ممكن للدكاترة أو الأدمن)
router.get('/all-users', userController.getAllUsers);

module.exports = router;