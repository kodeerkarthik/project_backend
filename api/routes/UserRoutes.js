module.exports = function(app) {
	var userData = require('../controller/UserController');
	var hospitaldet=require('../controller/UserController');
	var timer=require('../controller/UserController');
	var appoint=require('../controller/UserController');
	var selectdoctor = require('../controller/UserController');
	var isAuth = require('../Middleware/isAuth')
// Signup 
 app.route('/signup')
 .post(userData.userSignup)
 .get(userData.getAllUsers)

 app.route('/signin',isAuth)
 .post(userData.userSignin);
 
 app.route('/details')
	.get(hospitaldet.hospitalDetails)

app.route('/count')
	.get(timer.counting)

app.route('/appointment')	
	.post(appoint.getAppointment)

app.route('/selectdoctor')	
	.post(selectdoctor.postSelectDoctor)
	.get(selectdoctor.getSelectDoctor)
};


