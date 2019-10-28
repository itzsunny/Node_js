const express = require("express");
const app = express();
const url = require("url");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parse");
const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const port = process.env.PORT || 3000;

// built in middlewares

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// 3rd party middlewares

// error handler

app.use("/", (req, res, next) => {
  console.log(new Date().getUTCFullYear());
  next();
});

app.post("/", (req, res) => {
  console.log(req.body, "post saved on /");
  res.json(req.body);
});

app.get("/users:name", (req, res) => {
  let name = req.params.name;
  res.send(name);
});
app.post("/add", (req, res) => {
  console.log(req.body, "post saved on /add");
  res.json(req.body);
});

app.get("/static", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"), err => {
    if (err) res.next(err);
  });
});

// 404 page
app.use((req, res, next) => {
  res.status(404).send(`${req.url} is Not found`);
});

//500 error
app.use((err, req, res, next) => {
  res.status(500).send(`${err.msg}`);
});

//listener
app.listen(port, "localhost", () => {
  console.log("server started on port", port);
});
