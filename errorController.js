const AppError = require('../utils/AppError');

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `بيانات غير صحيحة: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  // تعديل بسيط لضمان التقاط القيمة المتكررة (مثل userCode المتكرر)
  const value = err.keyValue ? Object.values(err.keyValue)[0] : 'unknown';
  const message = `هذه القيمة موجودة مسبقاً: (${value}). يرجى استخدام قيمة أخرى!`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('التوكن غير صحيح. يرجى تسجيل الدخول مرة أخرى!', 401);

const handleJWTExpiredError = () =>
  new AppError('انتهت صلاحية التوكن! يرجى تسجيل الدخول مرة أخرى.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'عذراً، حدث خطأ ما في السيرفر!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // ملحوظة: لو إنتي شغالة على جهازك فغالباً المود هو development
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    // في حالة الـ Production بنهندل أخطاء الـ MongoDB المشهورة
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastError(error);
    if (err.code === 11000) error = handleDuplicateFields(error);
    if (err.name === 'ValidationError') error = handleValidationError(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};