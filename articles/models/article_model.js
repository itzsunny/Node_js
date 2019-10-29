const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let articles = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    author: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("articles", articles);
