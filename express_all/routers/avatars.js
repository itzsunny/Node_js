const express = require("express");
const router = express.Router();
const Model = require("../models/avatar");

// routers

// get
router.get("/", (req, res, next) => {
  Model.find({}, (err, allUsers) => {
    if (err) return next(err);
    // res.json({ data });
    res.render('users',{allUsers})
  });
});

// post
router.post("/", (req, res, next) => {
  Model.create(req.body, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

// update
router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  Model.findByIdAndUpdate(id,req.body, (err, updatedData) => {
    if (err) return next(err);
    res.json(updatedData);
  });
});

// delete
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Model.findByIdAndRemove(id, (err, deleted) => {
    if (err) return next(err);
    res.send(`${deleted.name}succesfully deleted!`);
  });
});

module.exports = router;
