var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstname: {
    type: String,
    required: 'Please Enter the firstname'
  },
  lastname: {
    type: String,
    required: 'Please Enter the lastname'
  }, 
  email: {
    type: String,
    required: 'Please Enter valid emailId'
  },
  password: {
    type: String,
    required: 'Please Enter the current password'
  },
  mobile: {
    type: String,
    required: 'Please Enter mobile number'
  }, 
  Created_date: {
    type: String,
    default: 'abc'
  }
});
module.exports = mongoose.model('UserInfo', UserSchema);

var detailSchema =new Schema({
  doctors:{ type:String, default:'25'},
  patients:{ type:String, default:'77'},
  wards:{ type:String, default:'80'},
  staff:{ type:String, default:'88'}
})
module.exports = mongoose.model('details', detailSchema);

var countSchema =new Schema({
  days:{ type:String, default:'365'},
  patients:{ type:String, default:'564'},
  doctors:{type:String, default:'164'},
  lab:{ type:String, default:'765'}
})
module.exports = mongoose.model('timercount', countSchema);

var appointmentSchema =new Schema({
  name: {
    type:String
  },
  email: {
    type:String
  },
  date:{
    type:Date,
    
  },
  message:{
    type:String
  }
})
module.exports - mongoose.model('appointment',appointmentSchema)

var selectdoctorSchema =new Schema({
  department: {
    type:String
  },
  doctor: {
    type:String
  },
  date:{
    type:Date,
    
  },
  patient:{
    type:String
  }
})
module.exports - mongoose.model('selectdoctor',selectdoctorSchema)