const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please tell us your name!'] },
  // غيرنا الإيميل لـ userCode عشان يطابق اللي في الداتا بيز
  userCode: { 
    type: String, 
    required: [true, 'Please provide your user code'], 
    unique: true 
  },
  role: { type: String, enum: ['student', 'doctor', 'admin'], default: 'student' },
  password: { 
    type: String, 
    required: [true, 'Please provide a password'], 
    minlength: 6, // خليناها 6 عشان تناسب 123456
    select: false 
  }
});

// ميثود لمقارنة الباسورد (مهمة جداً للوجين)
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;