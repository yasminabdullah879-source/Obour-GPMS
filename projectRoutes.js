const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

const router = express.Router();

// حماية كل المسارات (لازم يكون الطالب مسجل دخول عشان يتعامل مع المشاريع)
router.use(authController.protect);

router
  .route('/')
  .get(projectController.getAllProjects) // تصحيح: استدعاء الدالة اللي بتعرض المشاريع
  .post(projectController.createProject); // إضافة مشروع جديد مربوط بالطالب

router
  .route('/:id')
  .get(projectController.getProject)      // عرض تفاصيل مشروع معين (بالدكاترة والمعيدين)
  .patch(projectController.updateProject)   // تعديل بيانات المشروع (مطلوب في الورقة)
  .delete(projectController.deleteProject); // حذف المشروع (مطلوب في الورقة)

module.exports = router;