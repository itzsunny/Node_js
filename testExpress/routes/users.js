const express = require('express');
const router = express.Router();
const userInfo = require("../models/users");


// router

router.post("/", (req, res, next) => {
    userInfo.create(req.body,(err, created) => {
      if (err) return next(err);
      res.json({created});
    });
  });
  
  router.get("/", (req, res, next) => {
    userInfo.find({}, (err, users) => {
      if (err) return next(err);
      res.json({ users });
    });
  });
  
  router.get("/:id", (req, res, next) => {
    let id = req.params.id;
    userInfo.findById(id, (err, context) => {
      if (err) return next(err);
      res.json({ context });
    });
  });
  
  router.put("/:id", (req, res, next) => {
    let id = req.params.id;
    userInfo.findByIdAndUpdate(id, req.body, (err, updated) => {
      if (err) return next(err);
      res.json(updated);
    });
  });
  
  router.delete("/:id", (req, res, next) => {
    userInfo.findByIdAndRemove(id,(err,deleted)=> {
      if(err)return next(err);
      res.send(deleted,"succesfully");
    })
  });

  module.exports = router;