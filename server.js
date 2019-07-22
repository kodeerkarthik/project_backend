var express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Users');

UserData = require('./api/models/userModel'); 


var routes = require('./api/routes/UserRoutes'); 
routes(app);


app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), function(){
console.log('Server started on port ' + app.get('port'));
});

