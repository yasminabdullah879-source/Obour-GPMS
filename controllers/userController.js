const User = require('./../models/userModel');

// 1) الحصول على بياناتي
exports.getMe = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  });
};

// 2) تحديث بياناتي
exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password) {
      return res.status(400).json({ message: 'هذا المسار ليس لتعديل كلمة السر' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name: req.body.name, email: req.body.email },
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: 'success', data: { user: updatedUser } });
  } catch (err) {
    next(err);
  }
};

// 3) الحصول على كل المستخدمين (للمدير أو الدكتور)
exports.getAllUsers = async (req, res, next) => { // ضفنا next
  try {
    const users = await User.find();
    res.status(200).json({ status: 'success', results: users.length, data: { users } });
  } catch (err) {
    next(err);
  }
};

// 4) حذف حسابي
exports.deleteMe = async (req, res, next) => { // ضفنا next
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};

// 5) العمليات الخاصة بالفريق (Team)
exports.getMyTeam = async (req, res, next) => { // ضفنا next
  res.status(200).json({ status: 'success', message: 'جاري جلب الفريق...' });
};

exports.addToMyTeam = async (req, res, next) => { // ضفنا next
  res.status(200).json({ status: 'success', message: 'تم الإضافة للفريق' });
};

exports.deleteFromMyTeam = async (req, res, next) => { // ضفنا next
  res.status(200).json({ status: 'success', message: 'تم الحذف من الفريق' });
};