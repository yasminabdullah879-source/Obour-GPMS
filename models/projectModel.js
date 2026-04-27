const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'المشروع لازم يكون ليه عنوان'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'المشروع لازم يكون ليه وصف']
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'المشروع لازم يتبع طالب معين']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;