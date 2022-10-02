const route = require('express').Router();
const User = require('../models/user');
const Crypto = require('crypto-js');
const env = require('dotenv');
const jwt = require('jsonwebtoken');

//REGISTER
route.post('/register',async (req,res)=>{   
    //Create new user    
    const newUser = new User({
        name: req.body.username,
        username:req.body.username,
        email:req.body.email,
        mobile:req.body.mobile,
        password: Crypto.AES.encrypt(req.body.password,process.env.PASS_KEY).toString()
    });
    //Check for username/email/mobile is already registered or not
    const usernameCheck = await User.findOne({username:newUser.username});
    if(usernameCheck){
        res.status(200).json({message:"Username already exist"});
        return;
    }
    const emailCheck = await User.findOne({email:newUser.email});
    if(emailCheck){
        res.status(200).json({message:"Email already registered"});
        return;
    }
    const mobileCheck = await User.findOne({mobile:newUser.mobile});
    if(mobileCheck){
        res.status(200).json({message:"Mobile number already registered"});
        return;
    }

    //Try to save user to the Database
    try{
        const savedUser = await newUser.save();
        res.status(201).json({message : `${savedUser.username} registered successfully`});

    }catch(err){
        res.status(501).json({message :"Server Error "});
    }
});

//LOGIN
route.post('/login',async(req,res)=>{        

    try{
        //Find the user using either email/username/mobile
        const user = await User.findOne({$or:[{email:req.body.logUser},
                                            {username:req.body.logUser},
                                            {mobile:req.body.logUser}]});
        //User not found then retuen the request and user not allowed  to login
        if(!user){
            res.status(200).json({message :"user not found"});
            return;
        }
        //Check for correct password
        const password = Crypto.AES.decrypt(user.password,process.env.PASS_KEY).toString(Crypto.enc.Utf8);
        const originalPassword = req.body.password;
        if(password !== originalPassword){
            res.status(200).json({message:"Wrong Password!!!"});
            return;
        }
        //JWT token is assign to the user and  save it to the cookie
        //Token will expires after one hour
        const accessToken = jwt.sign({
            id:user._id
        },process.env.JWT_KEY,{expiresIn:'1h'});
        
        res.cookie("access_token", accessToken, {
                httpOnly: true,
                expires: new Date(Date.now()+(60*60*1000)),
                secure:true
            })
            .status(202)
            .json({ message: "Logged in successfully",
                    redirectURL: `/` });

    }catch(err){
        res.status(502).json("Server Error"+ err);
    }
});

//LOGOUT
route.get(`/logout`,(req,res)=>{
    res.clearCookie('access_token');
    res.status(200).json({message : "Logout successfully", redirectURL:`http://127.0.0.1:5000`});
});

module.exports = route; 