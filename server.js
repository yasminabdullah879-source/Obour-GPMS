const mongoose = require("mongoose");
const dotenv = require("dotenv");

// 1) تحميل متغيرات البيئة من ملف .env
dotenv.config({ path: "./.env" });
const app = require("./app");

// 2) الرابط (دلوقتي هنستخدم الرابط المحلي عشان يشتغل فوراً)
const DB = process.env.DATABASE_LOCAL || "mongodb://127.0.0.1:27017/obour_db";

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful! ✅ ✅ ✅");
    console.log("Connected to Local MongoDB (Compass) 💻");
  })
  .catch((err) => {
    console.log("Error connecting to DB: 💥", err.message);
  });

// 3) تشغيل السيرفر
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... 🚀`);
});