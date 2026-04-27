const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

// دالة لإنشاء التوكن (JWT)
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'my-ultra-secret-key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d'
  });
};

// 1) دالة التسجيل (Register)
exports.register = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      userCode: req.body.userCode, // تم التغيير لـ userCode
      password: req.body.password,
      role: req.body.role
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

exports.login = async (req, res, next) => {
  try {
    // بناخد الكود سواء الصفحة بعتته باسم userCode أو email
    const loginIdentifier = req.body.userCode || req.body.email;
    const password = req.body.password;

    if (!loginIdentifier || !password) {
      return res.status(400).json({ 
        status: 'fail',
        message: 'الرجاء إدخال الكود وكلمة السر' 
      });
    }

    // بندور في الداتا بيز بالـ userCode
    const user = await User.findOne({ userCode: loginIdentifier }).select('+password');

    if (!user || user.password !== password) {
      return res.status(401).json({ 
        status: 'fail',
        message: 'بيانات الدخول غير صحيحة' 
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
    
// 3) حماية المسارات (Protect)
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