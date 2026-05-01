const express = require('express');
const reportController = require('./../controllers/reportController'); // اتأكدي إن عندك كنترولر للتقارير
const authController = require('./../controllers/authController');

const router = express.Router();

// حماية المسارات عشان الطالب بس اللي يرفع
router.use(authController.protect);

router
  .route('/')
  .get(reportController.getAllReports)
  .post(reportController.createReport);

module.exports = router;