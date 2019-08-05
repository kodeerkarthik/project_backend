var mongoose = require('mongoose'),
UserData = mongoose.model('UserInfo');
hospitaldet=mongoose.model('details')
timer=mongoose.model('timercount')
appoint=mongoose.model('appointment')
selectdoctor=mongoose.model('selectdoctor')
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
var nodemailer = require ('nodemailer');


//get all users
exports.getAllUsers = function(req, res) {
 
  console.log(req.body);
  UserData.find({}, function(err, details) {
    if (err)
      res.send(err);
    res.json(details);
    // console.log(data);
  });
};

exports.hospitalDetails=function(req,res){
  // var detail= new hospitaldet(req.body);   detail.save(function(err, data){  if(err)  res.send(err.message);  res.json(data);  res.json("user succesfully created"); })
  hospitaldet.find( function(err,data){
    if (err)
      res.send(err);
      res.send(data);
      console.log(data);
  })
}


exports.counting=function(req,res){
  // var detail= new timer(req.body);    detail.save(function(err, data){   if(err)    res.send(err.message);    res.json(data); })
  timer.find( function(err,data){
    if (err)
      res.send(err);
      res.send(data);
      console.log(data);
  })
}

exports.getUser = function(req, res){

  console.log(req.params.emailId);    
  UserData.find({email: req.params.emailId},
    function(err, data){
      if (err)
        res.send(err);
      res.json(data);
      console.log(data);
    });
};


exports.userSignup = function(req, res){
  // console.log('hi')
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  const reg_mob=/^[0]?[789]\d{9}$/;
  const reg_pwd=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if(!reg_pwd.test(req.body.password)){
    res.send('password is invalid');
  }
  if(!reg_mob.test(req.body.mobile)){
    res.send('Mobile number is invalid');
  }
  if(reg_email.test(req.body.email)){
    // console.log("hii");
    UserData.find({email: req.body.email},function(err, data){
      if(data != null && data != ''){
        res.send('User already exists');
      }
      else
      {
        var userData = new UserData(req.body);
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(userData.password, salt, function(err, hash) {
            userData.password = hash;
            userData.save(function(err, data){
              if(err)
                res.send(err.message);
              res.json(data);
            })
          })
        })
      }
    });
  }
  else {
    res.send('Email is invalid');
  }
};

// exports.userSignin = function(req,res){
//   console.log('signin')
//   UserData.find({email: req.body.email}, function(err, data){
//     if(data != null && data != ''){
//       // bcrypt.compare(req.body.password, data[0].password, function( err, isMatch) {
//       //   if(isMatch == true){
//           // res.json(data);
//         UserData.find({password: req.body.password}, function(err, data){
//           if(data != null && data != ''){
//           res.send("User succesfully signIn");
//           }
//           else
//           res.send("password incorrect");
//         })
//         // }
//       // });
//     } 
//     else{
//       // res.send(err);
//       res.send("User does not exists");
//     }
//   });
// };

exports.userSignin = (req,res,next) =>{
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({email: email})
  .then(user =>{
    if(!user){
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    return bcrypt.compare(password,user.password);
  })
  .then(isEqual =>{
    if(!isEqual){
      const error = new Error('wrong password.');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
    {
      email: loadedUser.email,
      userId:loadedUser._id.toString()
    },'secret',)
    res.status(200).json({token: token, userId: loadedUser._id.toString()})
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }); 
}

exports.updateUser = function(req, res) {
  UserData.findOneAndUpdate({_id: req.body.userId}, 
    req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    })
}

exports.getAppointment = function(req,res){ 

  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  
  if(reg_email.test(req.body.email)){
    var Appoint = new appoint(req.body);

    Appoint.save(function(err, data){
      if(err)
        res.send(err.message);
      res.json(data);
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        // service: 'gmail',
        auth: {
          user: 'kkrishnegowdaostb1@gmail.com',
          pass: '23Dec1995'
        }
      });
      var mailOptions = {
       
        from: 'kkrishnegowdaostb1@gmail.com',
        to: data.email,
        subject: 'Acknowledge for getting appointment',
        text: `Hii your appointment with HEALTH+ is confirmed at `+data.date,
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
      };
      console.log(data.email)
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
          return console.log(error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })
  }
  else {
    res.send('Email is invalid');
  }
};

exports.postSelectDoctor = function(req,res){ 
  console.log('selectdoctor')
  var Selectdoctor = new selectdoctor(req.body);
  Selectdoctor.save(function(err, data){
    if(err)
      res.send(err.message);
    res.json(data);
    console.log(data)
  })
}
exports.getSelectDoctor = function(req,res){ 
  console.log('getselectdoctor')
  selectdoctor.find(function(err,data){
    if (err)
      res.send(err);
      res.send(data);
      // console.log(data);
  })
}
