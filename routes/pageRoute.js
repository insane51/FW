
const router = require('express').Router();
const env = require('dotenv');
const cookieParser = require('cookie-parser');
const {verifyToken} = require(`./tokenVerify`);
const User = require('./../models/user');

//Home page Route
router.get('',verifyToken,async (req,res)=>{
        try{
            const ud = await User.findById(req.user.id);
            res.render('index',{ user: ud});
        }catch(err){
            res.render('index',{ user: null});
        }
});

//LOGIN page route
router.get('/login',(req,res)=>{
    res.render('login',{ user: null});
});

//Profile page route only when user is already login
router.get('/profile',verifyToken,async (req,res)=>{
    try{
        const ud = await User.findById(req.user.id);
        res.render('profile',{ user: ud});
    }catch(err){
        res.render('page404',{ err: err});
    }
    
});

//REGISTER page route
router.get('/register',(req,res)=>{
    res.render('register',{ user: null});
});


module.exports = router;
