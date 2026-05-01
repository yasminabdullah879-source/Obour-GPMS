const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  project: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Project', 
    required: [true, 'يجب تحديد المشروع المراد حجزه'] 
  },
  // ربط الحجز بالدكتور (عشان الطالب يعرف مين هيناقشه)
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor'
  },
  roomNumber: { 
    type: String, 
    required: [true, 'يرجى تحديد رقم القاعة'] 
  },
  bookingTime: { 
    type: Date, 
    required: [true, 'يرجى تحديد موعد المناقشة'] 
  },
  status: { 
    type: String, 
    enum: ['confirmed', 'pending', 'cancelled'], 
    default: 'pending' 
  },
  notes: String // ملاحظات إضافية (مثل: يرجى إحضار اللابتوب)
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;