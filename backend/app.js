require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

const main = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      console.log(`Server is running on ${process.env.NODE_ENV} mode`);
      await mongoose.connect(process.env.TEST_MONGO_URI);
    } else {
      console.log(`Server is running on ${process.env.NODE_ENV} mode`);
      await mongoose.connect(process.env.MONGO_URI);
    }
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Failed to connect to MongoDB: ".error.message);
  }
};

main();

const tasksRouter = require("./routes/tasksRouter");
const usersRouter = require("./routes/usersRouter");
const testRouter = require("./routes/testRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/api/test", testRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
