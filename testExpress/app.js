// const express = require("express");
// const app = express();
// const url = require("url");
// const path = require("path");
// const logger = require("morgan");
// const cookieParser = require("cookie-parser");
// const port = process.env.PORT || 3000;

// // built in middlewares

// app.use(express.json());
// app.use(logger("dev"));
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
// // app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));

// // 3rd party middlewares

// // error handler

// app.use("/", (req, res, next) => {
//   console.log(new Date().getUTCFullYear());
//   next();
// });

// app.post("/", (req, res) => {
//   console.log(req.body, "post saved on /");
//   res.json(req.body);
// });

// app.get("/users:name", (req, res) => {
//   let name = req.params.name;
//   res.send(name);
// });
// app.post("/add", (req, res) => {
//   console.log(req.body, "post saved on /add");
//   res.json(req.body);
// });

// app.get("/static", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"),err => {
//     if(err) res.next(err);
//   });
// });

// // 404 page
// app.use((req, res, next) => {
//   res.status(404).send(`${req.url} is Not found`);
// });

// //500 error
// app.use((err, req, res, next) => {
//   res.status(500).send(`${err.msg}`);
// });

// //listener
// app.listen(port, "localhost", () => {
//   console.log("server started on port", port);
// });

//  express in action book

// const express = require("express");
// const mustache = require("mustache");
// const url = require("url");
// const http = require("http");
// const parsedUrl = url.parse("http://sunnymac.com?name=sunny");
// const app = express();
// const port = process.env.PORT || 3000;

// console.log(parsedUrl.protocol);
// console.log(parsedUrl.host);
// console.log(parsedUrl.hostname);
// console.log(parsedUrl.query);

// let greet = mustache.render(`hello,{{first}} {{last}}`, {
//   first: "sunny",
//   last: "choudhury"
// });
// console.log(greet);

//   const random = require('./exports.js');
//   console.log(random());
//   console.log(random());
//   console.log(random());
//   console.log(random());

//  const fs = require('fs');
//  fs.readFile('file.txt','utf-8',((err,data) => {
//    return (err)? console.log('err reading file'):  console.log(data);
//  }))

// app.listen(port, "localhost", () => {
//   console.log(`server started on port ${port}`);
// });

// function requestHandler(req, res) {
//   if (req.url == '/'){
//   console.log(`you are in ${req.url}`);
//   res.end("in /");
// } else if (req.url == '/about'){
//   console.log(`you are in ${req.url}`);
//   res.end('in /about');
// } else {
//   res.end('page not found')
// }
// }

// const server = http.createServer(requestHandler);
// server.listen(3000, "localhost", () => {
//   console.log("you are in the port ", port);
// })

// const express = require("express");
// const http = require("http");
// const logger = require("morgan");
// const port = process.env.PORT || 3000;
// const url = require("url");

// const app = express();

// app.use(logger("dev"));

// app.use((req, res, next) => {
//   let time = new Date().getMinutes();
//   if (time % 2 == 0) {
//     next();
//   } else {
//     res.statusCode = 403;
//     res.end("you are not authorized");
//   }
// });
// app.use((req, res) => {
//   res.end("secret info : the password is batman");
// });

// http.createServer(app).listen(port, () => {
//   console.log("server started on", port);
// });

// mongoose with routing

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// routes

const indexRoute = require("./routes/index");
const usersRoutes = require("./routes/users");

// connecting with Mongoose

mongoose.connect(
  "mongodb://localhost/testexpress",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    err ? console.log(err) : console.log("you are connected");
    // OR
    console.log("connected", err ? false : true);
  }
);

// initializing express

const app = express();

// setting up view engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRoute);
app.use("/users", usersRoutes);

// error 404

app.use((req, res) => {
  res.status(404).send("page not found");
});

// error 500

app.use((err, req, res, next) => {
  res.status(500).json(err);
});

app.listen(3000, "localhost", () => {
  console.log("server started on", 3000);
});
