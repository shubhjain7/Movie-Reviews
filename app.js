const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const post = require('./routes/post');

const app = express();
const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;

const MONGODB_URL = "mongodb+srv://shubh_mongodb:Movie_review@321@cluster0.yeux2.mongodb.net/reviews?retryWrites=true&w=majority";
//Pass: Movie_review@321
mongoose.connect(MONGODB_URL,{useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true})
.then(()=>{
 console.log('Connected to database');
})
.catch((err)=>{
  console.log(err);
  console.log('Connected failed!!');
 });


 

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.engine('mustache' , mustacheExpressInstance);
app.set('view engine' , 'mustache');
app.set('views' , __dirname +'/views');
app.use(express.static(__dirname+ '/public'));

// app.get('/',function(req,res){
//     res.sendFile(path.join(__dirname + '/index.html'));
// });
//app.use('/',express.static(__dirname+'/index.html'));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With ,Content-Type , Accept , Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET , POST , PATCH , PUT , DELETE , OPTIONS");
  next();
});


app.use('/',post);

module.exports = app;
