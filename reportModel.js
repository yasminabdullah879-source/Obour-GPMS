const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'الرجاء إدخال عنوان التقرير']
  },
  fileUrl: {
    type: String,
    required: [true, 'الرجاء إضافة رابط الملف']
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'التقرير يجب أن ينتمي لمشروع معين']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;