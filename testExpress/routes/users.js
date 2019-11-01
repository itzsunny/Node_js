const express = require("express");
const userInfo = require("../models/userinfo");
const router = express.Router();

// router

// register new user



// add userform

router.get("/newuser",(req,res,next)=> {
  res.render("newUser");
})

//add user

router.post("/",(req,res,next)=> {
  userInfo.create(req.body,(err,newUser) => {
    if(err)return next(err);
    res.redirect('/users');
  })
})

// get All users
router.get("/", (req, res, next) => {
  userInfo.find({},(err, users) => {
    if (err) return next(err);
    res.render("allUsers", { users });
  });
});

// router.post("/", (req, res, next) => {
//   userInfo.create(req.body, (err, created) => {
//     if (err) return next(err);
//     res.json({ created });
//   });
// });



// router.get("/:id", (req, res, next) => {
//   let id = req.params.id;
//   userInfo.findById(id, (err, context) => {
//     if (err) return next(err);
//     res.json({ context });
//   });
// });

// user info
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  userInfo.findById(id, (err, userInfo) => {
    if (err) return next(err);
    res.render("userInfo",{ userInfo})
  });
});

// router.put("/:id", (req, res, next) => {
//   let id = req.params.id;
//   userInfo.findByIdAndUpdate(id, req.body, (err, updated) => {
//     if (err) return next(err);
//     res.json(updated);
//   });
// });

// update userInfo

router.get("/:id/updateUserInfo", (req, res, next) => {
  let id = req.params.id;
  userInfo.findById(id, (err, user) => {
    if (err) return next(err);
    res.render('updateUserInfo',{ user });
  });
});

// update and redirect
router.post("/:id", (req, res, next) => {
  let id = req.params.id;
  userInfo.findByIdAndUpdate(id, req.body, (err, user) => {
    if (err) return next(err);
    res.redirect(`/users/${id}`);
  });
});


// router.delete("/:id", (req, res, next) => {
//   userInfo.findByIdAndRemove(id, (err, deleted) => {
//     if (err) return next(err);
//     res.send(deleted, "succesfully");
//   });
// });

// delete user

router.get("/:id/deleteUser", (req, res, next) => {
  let id = req.params.id;
  userInfo.findByIdAndRemove(id, (err, deleted) => {
    if (err) return next(err);
    res.redirect('/users');
  });
});



module.exports = router;
