const route = require('express').Router();
const User = require('../models/user');
const Crypto = require('crypto-js');
const env = require('dotenv');
const jwt = require('jsonwebtoken');
const { verifyToken, verifyTokenAndAuthorization } = require('./tokenVerify');

//USER UPDATE
route.put(`/update/:id`,verifyTokenAndAuthorization,async (req,res)=>{
    // console.log(req.body);
    try{
        //CHECK FOR CORRECT PASSWORD
        const user = await User.findById(req.params.id);
        const password = Crypto.AES.decrypt(user.password,process.env.PASS_KEY).toString(Crypto.enc.Utf8);
        const originalPassword = req.body.oldPassword;
        if(password !== originalPassword){
            res.status(200).json({message:"Wrong Password!!!"});
            return;
        }

        var updateUser = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            mobile: req.body.mobile,
        };
        //ADD IF USER WANTS TO UPDATE PASSWORD
        if(req.body.isPassword){
            updateUser['password'] = Crypto.AES.encrypt(req.body.newPassword,process.env.PASS_KEY).toString();
        }

        const dbResponse = await User.findByIdAndUpdate(req.params.id,updateUser,{new:true});
        res.status(201).json({message:`User Updated Successfully`});
        return;
    }catch(err){
        res.status(500).json({message:`Server error Please try after sometime`});
    }
});





module.exports = route;