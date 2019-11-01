// creating Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let objectId = Schema.Types.ObjectId;
const mySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      match: /@/,
      minlength: 5,
      require: true,
      unique: true,
      lowercase: true
    },
    age: {
      type: Number,
      min: 18,
      max: 60
    },
    password: {
      type:String,
      min: 5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    favourites: [String]
  },
  { timestamps: true }
);

const car = new Schema({
  address: {
    village: String,
    city: String,
    state: String,
    pin: Number,
    user: objectId
  }
});
var userInfo = mongoose.model('userInfo',mySchema);
module.exports = userInfo;