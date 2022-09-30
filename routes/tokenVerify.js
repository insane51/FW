const jwt = require('jsonwebtoken');
const User = require(`./../models/user`);


//To verify Token and check for token
const verifyToken =  (req,res,next)=>{
    const accesstoken = req.cookies.access_token;
    
    if(accesstoken){
        jwt.verify(accesstoken,process.env.JWT_KEY,(err,user)=>{
            if(err) next();
            req.user = user;
        });
    }
    next();
};

//To varify the user and authorise it for perticular operation(like profile updation)
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.params.id === req.user.id){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }

    });
};



module.exports = {verifyToken,verifyTokenAndAuthorization};