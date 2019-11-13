const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:String,
    email: {
        type:String,
        match:/@/,
        unique:true
    },
    profile: {
        type:String
    }
},{timestamps:true});




module.exports = mongoose.model("User",userSchema);