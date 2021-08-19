var express = require('express');
var router = express.Router();
var pixelschema = require('../models/pixel')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

// run n server 
router.get('/registration',(req,res)=>{
  res.render('index')
});

router.get('/users',(req,res)=>{
  res.render('users')
});

router.get('/addpage',(req,res)=>{
  res.render('addpage')
});

router.get('/editpage',(req,res)=>{
  res.render('editpage')
});






router.post("/registration",async(req,res)=>{
  try {
    // console.log(req.body)
    // return
    var email = req.body.email;
    var emailCheck = await pixelschema.findOne({email:email});
    console.log(emailCheck)
    if(emailCheck){
      res.status(401).json({status:false,"message":"Email already Exists"});
    }else{
      console.log(req.body)
      let post = {
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password,
        confirmPass:req.body.confirmPass
      }
      let register = await pixelschema.create(post);
      res.status(200).json({status:true,'result':register})
    } 
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

router.get('/list',(req,res)=>{
  res.json('from list');
});

router.post("/login",async(req,res)=>{
  try{
  
    var email = req.body.email;
    var password = req.body.password;
    var checkEmail = await pixelschema.findOne({email:email});
    console.log(checkEmail)
    if(checkEmail){
      if(password === (checkEmail.password)){
        res.status(200).json({status:true,'result':"ok"})
      }else{
        res.send ("invalid password")
      }
    }else {
      res.send("Invalid Email")
    }
  }catch(error){
    console.log(error)
    res.status(400).json({status:false,"message":"invalid credentials"})
  }
  });

  router.get('/edit/:id',(req,res,next)=>{
    var userId = req.params.id;

  })

module.exports = router;

