const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'لازم تكتب اسم الدكتور'] 
  },
  department: { 
    type: String, 
    default: 'BIS' 
  }, 
  email: { 
    type: String, 
    unique: true,
    lowercase: true // عشان الإيميل يتسجل دايماً حروف صغيرة
  },
  phone: String,
  specialization: String,
  // إضافة حقل للمشاريع اللي بيشرف عليها الدكتور
  projects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Project'
    }
  ]
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;