const express = require("express");
const router = express.Router();
const articles = require("../models/article_model");


// create articles

router.post("/",(req,res,next)=> {
    articles.create(req.body,(err,articles)=> {
        err ? next(err) : res.json( articles );
    })
})

// get all articles

router.get("/",(req,res,next)=> {
    articles.find({},(err,articles)=> {
        err ? next(err) : res.json({ articles });
    })
})


module.exports = router;