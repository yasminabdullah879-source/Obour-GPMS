const express = require('express');
const assisController = require('../controllers/assisController');
const authController = require('../controllers/authController');

const router = express.Router();

// حماية كل المسارات - لازم يكون مسجل دخول
router.use(authController.protect);

// المسار الأساسي
router
  .route('/')
  .get(assisController.addAssis) // أو دالة getAll لو موجودة
  .post(assisController.addAssis);

// المسارات الفرعية
router.post('/add', assisController.addAssis);
router.delete('/rem/:id', assisController.remAssis);
router.post('/assign/:id', assisController.assignToProj); // ضفت :id عشان نحدد المعيد
router.post('/book', assisController.bookRoomTime);

// التصحيح المهم هنا:
module.exports = router;