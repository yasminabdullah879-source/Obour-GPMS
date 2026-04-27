const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Routes Imports
const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");

//Error handler
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Obour Project API!");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "route not found",
  });
});

app.use(globalErrorHandler);

module.exports = app;
