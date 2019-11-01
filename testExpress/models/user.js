const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: /@/
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 18
    },
    gender: {
        type:String,
        enum:["male","female","others"],
        required:true
    },
    phone: {
        type:Number,
    }
  },
  { timestamps: true }
);


// userSchema.pre()

module.exports = mongoose.model("Users",userSchema);
