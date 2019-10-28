const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 3000;

// importing routes

const indexRouter = require("./routers/index");
const mainRouter = require("./routers/avatars");

// connecting to mongodb
mongoose.connect(
  "mongodb://localhost/express_all",
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    console.log("connected", err ? false : true);
  }
);

//  initializing express App

const app = express();

// set view engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// logger
app.use(logger("dev"));
// json Parser
app.use(express.json());

// handle routes

app.use("/", indexRouter);
app.use("/avatars", mainRouter);

// error handlers

// 404
app.use((req, res) => {
  res.status(404).send("page not found");
});

// 500

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(port, "localhost", () => {
  console.log("server started on port", port);
});
