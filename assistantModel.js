const mongoose = require('mongoose');

const assistantSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'لازم تكتب اسم المعيد'] 
  },
  // إضافة القسم عشان الطلبة تلاقي المعيدين بتوع قسمها
  department: {
    type: String,
    enum: ['BIS', 'Accounting', 'Management'],
    default: 'BIS'
  },
  projects: [{ 
    type: mongoose.Schema.ObjectId, 
    ref: 'Project' 
  }], 
  availableTime: [String]
});

const Assistant = mongoose.model('Assistant', assistantSchema);
module.exports = Assistant;