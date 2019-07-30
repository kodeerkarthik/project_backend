module.exports = function(app) {
	var userData = require('../controller/UserController');
	var hospitaldet=require('../controller/UserController');
	var timer=require('../controller/UserController');
	var appoint=require('../controller/UserController');
// Signup 
 app.route('/signup')
 .post(userData.userSignup)
 .get(userData.getAllUsers)

// app.route('/signup')
 //user detail
//  app.route('/getUser/:emailId')
//  .get(userData.getUser);

 //update 
//  app.route('/updateUser')
//  .put(userData.updateUser);

// 
//  app.route('/deleteUser/:userId')
//  .delete(userData.deleteUser);

 //Sign
 app.route('/signin')
 .post(userData.userSignin);
 
 app.route('/details')
	.get(hospitaldet.hospitalDetails)
	// .posnt(hospitaldet.setdetails)

app.route('/count')
	.get(timer.counting)

app.route('/appointment')	
	.post(appoint.getAppointment)
};

