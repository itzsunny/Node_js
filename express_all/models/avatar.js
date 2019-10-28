const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String
    },
    email: {
      require: true,
      type: String,
      unique: true,
      match: /@/,
      lowercase: true
    },
    age:{
        default:18,
        type:Number
    },
    createAt: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);


let Model = mongoose.model('Model',userSchema);
module.exports = Model;

