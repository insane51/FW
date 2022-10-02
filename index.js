const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const env = require('dotenv');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

env.config();
const  hostname = process.env.Hostname;
const  port = process.env.PORT||80;

//DB Connection
mongoose.connect(process.env.dBurl,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connection");
}).catch((err)=>{
    console.log(err);
});
console.log(`Server running at http://${hostname}:${port}/`);

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

//SET VIEW ENGINE
app.set('view engine','ejs');


app.listen(port,(req,res)=>{
});

//Page Routes
const pageRoutes = require(`./routes/pageRoute`);
app.use(`/`,pageRoutes);

//Authentication Routes(login,register,logout)
const auth = require('./routes/auth');
app.use('/api/auth',auth);

//User Update route
const user = require(`./routes/user`);
app.use(`/api/user`,user);

