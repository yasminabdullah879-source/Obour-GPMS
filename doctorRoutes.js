const express = require('express');
const doctorController = require('./../controllers/doctorController');
const authController = require('./../controllers/authController');

const router = express.Router();

// حماية المسارات - لازم الطالب أو الإدمن يكون مسجل دخول
router.use(authController.protect);

// المسار الأساسي لجلب كل الدكاترة أو إضافة دكتور جديد
router
  .route('/')
  .get(doctorController.getAllDoctors) // عشان تعرضي لستة الدكاترة في الفرونت
  .post(doctorController.addDoctor);

// مسارات العمليات على دكتور معين بواسطة الـ ID
router.post('/add', doctorController.addDoctor); // المسار اللي إنتِ كتبتيه (شغال تمام)
router.delete('/rem/:id', doctorController.removeDoctor);
router.patch('/upd/:id', doctorController.updateDoctor);

module.exports = router;