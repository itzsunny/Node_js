const express = require("express");
const router = express.Router();
const Article = require("../models/article_model");

// routers

// create form

router.get('/create',(req,res)=> {
  res.render('newUser');
  })

// create article
router.post("/", (req, res, next) => {
  Article.create(req.body, (err, created) => {
    console.log(req.body);
    if (err) return next(err);
    res.redirect('/articles');
  });
});

// All articles
router.get("/", (req, res, next) => {
  Article.find({}, (err, article) => {
    if (err) return next(err);
    res.render('articles',{article});
  });
});

// single Article

router.get("/:id", (req, res, next) => {
  let id = req.params.id
  Article.findById(id,(err, article) => {
    if (err) return next(err);
    res.render('singleArticle',{article});
  });
});

// update
router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id,req.body, (err, updatedData) => {
    if (err) return next(err);
    res.json(updatedData);
  });
});

// delete
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndRemove(id, (err, deleted) => {
    if (err) return next(err);
    res.send(`${deleted.name}succesfully deleted!`);
  });
});

module.exports = router;
