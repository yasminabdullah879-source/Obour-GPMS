const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1) تحميل الإعدادات من ملف .env
dotenv.config({ path: './.env' });
const app = require('./app');

// 2) رابط قاعدة البيانات المحلية (Local) اللي لقينا فيها البيانات
// تم التعديل ليربط بـ bookStoreDB بدلاً من السيرفر الأونلاين
const DB = 'mongodb://localhost:27017/bookStoreDB';

// 3) الاتصال بقاعدة البيانات
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful! ✅ ✅ ✅');
    console.log('Connected to Database: bookStoreDB 📂');
  })
  .catch(err => {
    console.log('Error connecting to DB: 💥', err.message);
    console.log('تأكدي من تشغيل MongoDB Compass والضغط على Connect');
  });

// 4) تشغيل السيرفر على بورت 5000
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... 🚀`);
  console.log('جاهز لاستقبال طلبات تسجيل الدخول من الفرونت إيند');
});

// 5) معالجة الأخطاء غير المتوقعة
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});