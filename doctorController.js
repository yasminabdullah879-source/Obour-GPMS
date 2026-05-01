const Doctor = require('./../models/doctorModel');

// 1) إضافة دكتور جديد (Add Doctor)
exports.addDoctor = async (req, res, next) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'تم إضافة الدكتور بنجاح',
      data: { doctor: newDoctor }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// 2) حذف دكتور (Remove Doctor)
exports.removeDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ status: 'fail', message: 'الدكتور غير موجود' });
    }

    res.status(200).json({
      status: 'success',
      message: 'تم حذف الدكتور بنجاح'
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// 3) تحديث بيانات دكتور (Update Doctor)
exports.updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doctor) {
      return res.status(404).json({ status: 'fail', message: 'الدكتور غير موجود' });
    }

    res.status(200).json({
      status: 'success',
      message: 'تم تحديث بيانات الدكتور بنجاح',
      data: { doctor }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// 4) عرض قائمة الدكاترة (Get All Doctors) - مهمة للفرونت إيند
exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      status: 'success',
      results: doctors.length,
      data: { doctors }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};