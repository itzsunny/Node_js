const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
      type: String,
      enum: ["male", "female", "others"],
      required: true
    },
    phone: {
      type: Number
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  console.log(this, 'inside pre save hook')
  if(this.password && this.isModified('password')){
    bcrypt.hash(this.password,10,(err,password) => {
      err ? next(err) : this.password = password;
      next()
    })
  } else {
    next()
  }
});

userSchema.methods.verifyPassword = function (password){
  return bcrypt.compareSync(password,this.password);
}


// userSchema.methods.verifyPassword = function (password, cb) {
//   bcrypt.compare(password,this.password, (err, matched) => {
//     if(err) return cb(null, false);
//     return cb(null, matched);
//   });
// }

module.exports = mongoose.model("User", userSchema);

