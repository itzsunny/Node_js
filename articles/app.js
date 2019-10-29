const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 4000;

// importing routers

const indexRouter = require("./routes/index");
const articleRouter = require("./routes/articles");

// connecting to database
mongoose.connect(
  "mongodb://localhost/articles",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    err ? console.log(err) : console.log("Connected");
  }
);

// initializing express in app
const app = express();

// logger

app.use(logger("dev"));

// json parser

app.use(express.json());

// form parser

app.use(express.urlencoded({ extended: false }));

// static middleware

app.use(express.static(path.join(__dirname, "public")));
// routers

app.use("/", indexRouter);
app.use("/articles", articleRouter);

// setting up virtual engine
app.set("virtual engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// error handlers
// 404

app.use((req, res) => {
  res.status(400).send("Page not found");
});

// 500
app.use((err, req, res, next) => {
  res.status(500).json(err);
});

// strarting server
app.listen(port, "localhost", () => {
  console.log(`server started on port ${port}`);
});
