const express = require("express");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("./routers/avatars");
const port = process.env.PORT || 3000;

// connecting to mongodb
mongoose.connect(
  "mongodb://localhost/day4_session",
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    console.log("connected", err ? false : true);
  }
);

// logger
app.use(logger("dev"));
// json
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("welcome to Express");
});
app.use("/users", router);

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
