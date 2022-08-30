"use strict";

//IMPORTS
//READ .ENV
if (process.env.NODE_ENV !== "production") {
  var dotenv = require("dotenv");

  dotenv.config();
}

var createError = require("http-errors");

var express = require("express");

var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var passport = require("passport");

var flash = require("express-flash");

var session = require("express-session");

var compression = require("compression"); //Compression


var helmet = require("helmet"); //Protection
//Model


var User = require("./models/user.js"); //Route imports


var indexRouter = require("./routes/index");

var userRouter = require("./routes/user");

var app = express(); //No view engine
// Set up mongoose connection to mongoDB

var mongoose = require("mongoose");

var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:")); //Middleware

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(compression()); //Compress all routes

app.use(express["static"](path.join(__dirname, "public"))); //ROUTES

app.use("/", indexRouter);
app.use("/user", userRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.json({
    error: err
  });
});
module.exports = app; //Middleware functions

var checkAuthenticated = function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};

var checkNotAuthenticated = function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  return next();
};