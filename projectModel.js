const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'لازم تكتب عنوان المشروع'] 
  },
  description: { 
    type: String, 
    required: [true, 'لازم تكتب وصف المشروع'] 
  },
  // ربط الطالب صاحب المشروع
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  // ربط أعضاء الفريق (مصفوفة من المستخدمين)
  teamMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  // ربط الدكتور المشرف
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor'
  },
  // ربط المعيد المشرف
  assistant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Assistant'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now() 
  }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;