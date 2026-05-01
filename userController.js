const User = require('./../models/userModel');

// 1) الحصول على بياناتي (Get Me)
exports.getMe = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  });
};

// 2) تحديث بياناتي (Update Me)
exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'هذا المسار ليس لتعديل كلمة السر، يرجى استخدام /updatePassword' 
      });
    }

    // السماح بتعديل الاسم والكود
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { 
        name: req.body.name, 
        userCode: req.body.userCode 
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: 'success', data: { user: updatedUser } });
  } catch (err) {
    next(err);
  }
};

// 3) الحصول على كل المستخدمين (Get All Users)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ 
      status: 'success', 
      results: users.length, 
      data: { users } 
    });
  } catch (err) {
    next(err);
  }
};

// 4) حذف حسابي (Delete User)
exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};

// ============================================================
// 5) العمليات الخاصة بالفريق (Team Operations)
// ============================================================

// عرض أعضاء فريقي (Get My Team)
exports.getMyTeam = async (req, res, next) => {
  try {
    // populate بتجيب بيانات الأعضاء كاملة بدل الـ IDs
    const user = await User.findById(req.user.id).populate('teamMembers');
    res.status(200).json({
      status: 'success',
      data: { team: user.teamMembers || [] }
    });
  } catch (err) {
    next(err);
  }
};

// إضافة زميل للفريق (Add to My Team)
exports.addToMyTeam = async (req, res, next) => {
  try {
    const memberToAdd = await User.findOne({ userCode: req.body.userCode });
    
    if (!memberToAdd) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'لم يتم العثور على طالب بهذا الكود' 
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { teamMembers: memberToAdd._id } },
      { new: true }
    ).populate('teamMembers');

    res.status(200).json({ 
      status: 'success', 
      message: 'تم إضافة الزميل للفريق بنجاح', 
      data: { team: user.teamMembers } 
    });
  } catch (err) {
    next(err);
  }
};

// حذف زميل من الفريق (Delete From My Team)
exports.deleteFromMyTeam = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { teamMembers: req.params.memberId } },
      { new: true }
    );

    res.status(200).json({ 
      status: 'success', 
      message: 'تم حذف الزميل من الفريق' 
    });
  } catch (err) {
    next(err);
  }
};