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
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserInfo', UserSchema);