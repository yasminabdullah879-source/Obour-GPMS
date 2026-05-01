const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please tell us your name!'] 
  },
  userCode: {
    type: String,
    required: [true, 'Please provide your user code'],
    unique: true,
  },
  role: {
    type: String,
    enum: ['student', 'doctor', 'admin'],
    default: 'student',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
  },
  teamMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

// تشفير الباسورد تلقائياً قبل الحفظ
userSchema.pre('save', async function() {
  // بنشفر الباسورد بس لو اتعدل أو لسه جديد
  if (!this.isModified('password')) return;

  // تشفير الباسورد بقوة 12
  this.password = await bcrypt.hash(this.password, 12);
});

// دالة للتأكد من صحة الباسورد عند اللوجن
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;