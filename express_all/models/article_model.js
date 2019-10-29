const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    title: {
      // required: true,
      type: String
    },
    description: {
      // require: true,
      type: String
    },
    likes: {
      type:Number,
      default:0
    },
    author:{
        // required:true,
        type:String
    },
  },
  { timestamps: true }
);


let Article = mongoose.model('Articles',userSchema);
module.exports = Article;

