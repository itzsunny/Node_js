var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var mongoose = require("mongoose");
var passport = require('passport');
var MongoStore = require("connect-mongo")(session);

require("dotenv").config();
require("./modules/passport");


// routes

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");



//connect to mongodb

mongoose.connect(
  "mongodb://localhost/passport",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    console.log("Connected", err ? false : true);
  }
);

// initializing

var app = express();

// set viewengine

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.secret,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
