const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const app = require("./app");

const DB = "mongodb://localhost:27017/bookStoreDB";

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful! ✅ ✅ ✅");
  })
  .catch((err) => {
    console.log("Error connecting to DB: 💥", err.message);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... 🚀`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
