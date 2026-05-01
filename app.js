const express = require('express');
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const doctorRouter = require('./routes/doctorRoutes'); // اتأكدي من المسار
const assistantRouter = require('./routes/assistantRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const reportRouter = require('./routes/reportRoutes');
const globalErrorHandler = require('./controllers/errorController');
const app = express();


app.use(express.json()); // عشان يفهم الداتا اللي جاية من الفرونت[cite: 1]
app.use(globalErrorHandler);
// الـ APIs الأساسية
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/assistants', assistantRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/reports', reportRouter);
// حل مشكلة النجمة (*) اللي كانت بتطلع Error
app.all(/(.*)/, (req, res, next) => {
  res.status(404).json({ status: 'fail', message: `المسار ${req.originalUrl} غير موجود!` });
});

module.exports = app;