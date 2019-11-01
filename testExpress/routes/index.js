const express = require("express");
const router = express.Router();
const userRegister = require("../models/user");


router.get('/',(req,res)=> {
    res.render('index');
})

router.get('/register',(req,res)=> {
    res.render("register");
  })
router.post("/register" ,(req,res,next)=> {
    userRegister.create(req.body,(err,registeredUser)=> {
        err ? next(err) : res.redirect("/login");
    })
})

router.get("/login",(req,res)=> {
    res.render("login");
})
module.exports = router;