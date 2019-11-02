const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  if (req.session && req.session.userId) {
    res.redirect("/users");
  } else {
    res.redirect("/login");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res, next) => {
  console.log(req.body);
  User.create(req.body, (err, registeredUser) => {
    err ? next(err) : res.redirect("/login");
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) return next("enter a valid email ID");

    // user.verifyPassword(password, (err, matched) => {
    //   if (err) return next(err);
    //   if (!matched) return res.redirect("/login");
    //   // login user by crearing a session for the user
    //   console.log(matched,"inside matched");
    //   if(matched) res.redirect("/");
    // });

      if (!user.verifyPassword(password)) return res.redirect("/login");
      // login user by creating a session
      req.session.userId = user.id;
      res.redirect("/");
    });
  });

module.exports = router;

// 1. session generate // req.session
// 2. cookie - session middleware(connect.sid)
// 3. retrieve session // req.session
