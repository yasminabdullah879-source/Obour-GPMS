const Booking = require('../models/bookingModel');

// 1) إنشاء حجز جديد (Create Booking)
exports.createBooking = async (req, res, next) => {
  try {
    // ربط الحجز بالمشروع والبيانات اللي جاية من الـ Body
    const newBooking = await Booking.create(req.body);

    res.status(201).json({ 
      status: 'success', 
      message: 'تم حجز القاعة والموعد بنجاح',
      data: { booking: newBooking } 
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// 2) عرض كل الحجوزات (Get All Bookings)
exports.getAllBookings = async (req, res, next) => {
  try {
    // زودنا populate للدكتور والمشروع عشان الداتا تظهر كاملة في الـ Postman
    const bookings = await Booking.find()
      .populate({
        path: 'project',
        select: 'title student' // بيظهر اسم المشروع والطالب بس
      })
      .populate('doctor', 'name'); // بيظهر اسم الدكتور المشرف

    res.status(200).json({ 
      status: 'success', 
      results: bookings.length,
      data: { bookings } 
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// 3) حذف حجز (Delete Booking) - مهم عشان لو الطالب حب يغير ميعاده
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ status: 'fail', message: 'الحجز غير موجود' });
    }

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};