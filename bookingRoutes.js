const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController'); // ضروري للحماية

const router = express.Router(); // تصحيح: إضافة الأقواس ()

// حماية المسارات: مفيش حد يقدر يحجز أو يشوف الحجوزات غير لما يسجل دخول
router.use(authController.protect);

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

// إضافة مسار الحذف (لو حابة تضيفيه في الـ Postman)
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;