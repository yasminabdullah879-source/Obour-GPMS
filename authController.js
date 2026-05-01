const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

// دالة لإنشاء التوكن (JWT)
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'my-ultra-secret-key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d'
  });
};

// 1) دالة التسجيل (Signup)
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      userCode: req.body.userCode,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'student'
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser }
    });
  } catch (err) {
    next(err);
  }
};

// 2) دالة تسجيل الدخول (Login)
exports.login = async (req, res, next) => {
  try {
    const { userCode, email, password } = req.body;

    // التأكد من وجود وسيلة دخول وباسورد
    if ((!userCode && !email) || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'الرجاء إدخال الكود (أو الإيميل) وكلمة السر'
      });
    }

    // البحث عن المستخدم (بالكود أو الإيميل)
    // البحث عن المستخدم باستخدام الكود فقط (لأن ده اللي بنستخدمه في معهد العبور)
const user = await User.findOne({ userCode: userCode }).select('+password');

// لو مفيش مستخدم بالكود ده
if (!user) {
    return res.status(401).json({
        status: 'fail',
        message: 'كود المستخدم غير مسجل'
    });
}

// المقارنة بين الباسورد اللي باعتّاه وبين اللي في الداتا بيز
const isCorrect = await user.correctPassword(password, user.password);

if (!isCorrect) {
    return res.status(401).json({
        status: 'fail',
        message: 'كلمة السر غير صحيحة'
    });
}

    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};

// 3) حماية المسارات (Protect Middleware)
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'أنت غير مسجل دخول، يرجى تسجيل الدخول' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my-ultra-secret-key');

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'المستخدم لم يعد موجوداً' });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

// 4) جلب بيانات المستخدم الحالي (Get Me) - للبروفايل
exports.getMe = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  });
};

// 5) تحديث البيانات الشخصية (Update Me)
exports.updateMe = async (req, res, next) => {
  try {
    // نمنع تحديث الباسورد من هنا
    if (req.body.password) {
      return res.status(400).json({ message: 'هذا المسار ليس لتحديث كلمة السر' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      name: req.body.name,
      email: req.body.email
    }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: { user: updatedUser }
    });
  } catch (err) {
    next(err);
  }
};

// 6) تغيير كلمة السر (Update Password)
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // ملاحظة: يفضل استخدام bcrypt.compare هنا أيضاً
    if (req.body.passwordCurrent !== user.password) {
      return res.status(401).json({ status: 'fail', message: 'كلمة السر الحالية غير صحيحة' });
    }

    user.password = req.body.password;
    await user.save();

    const token = signToken(user._id);
    res.status(200).json({ status: 'success', token });
  } catch (err) {
    next(err);
  }
};

// 7) نسيان كلمة السر (Forgot Password)
exports.forgotPassword = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'تم إرسال رابط استعادة كلمة السر إلى إيميلك (تجريبي)'
  });
};