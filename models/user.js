const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name : {type : String,require:true},
    username : {type : String,unique:true,require:true},
    email : {type : String,unique:true,require:true,lowercase: true},
    mobile : {type : String,unique:true,require:true},
    password : {type : String,require:true},
},{timestamps:true},);

module.exports = mongoose.model("User",userSchema);