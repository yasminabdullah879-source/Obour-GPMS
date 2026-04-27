const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');

const app = express();

// 1) Middlewares الأساسية (لازم تكون في الأول)
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 2) الـ Routes (لازم تكون قبل الـ Error Middleware)
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);

// 3) مسار تجريبي
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Obour Project API!');
});

// 4) الـ Global Error Middleware (لازم يكون آاااخر حاجة في الملف)
app.use((err, req, res, next) => {
  console.log('Error Middleware Caught: 💥', err.message); // سطر عشان نشوف الغلط في الـ Terminal
  
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong!'
  });
});

module.exports = app;