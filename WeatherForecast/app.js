/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    ,home = require('./routes/home')
    ,sensor= require('./routes/sensor')
    ,hub = require('./routes/hub')
    , http = require('http')
    , path = require('path');
var MongoDB = require("./routes/MongoDBHandler");

var sessionConnectURL = "mongodb://cmpe281:cmpe281@ds157677.mlab.com:57677/cmpe281";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);  //passing parameter to expressSession module


var app = express();

app.use(expressSession({
    secret: 'cmpe273_teststring',
    resave: true,  //don't save session if unmodified
    saveUninitialized: false,       // don't create session until something stored
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: sessionConnectURL
    })
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/signup', home.signup);
app.get('/login', home.login);
app.get('/home', home.index);
app.get('/adminDashboard',home.adminDashboard);
app.get('/logout', home.logout);
app.get('/requestData',home.requestData);

app.post('/getSensorData', sensor.getSensorData);
app.post('/addUser',home.addUser);
app.post('/userLogin',home.userLogin);
app.get('/userDashboard',home.userDashboard);
app.get('/billing',home.billing);
app.get('/map',home.map);
app.get('/getDropDownOptions',sensor.getDropDownOptions);

app.post('/resetBill', home.resetBill);

app.post('/addNewSensor',sensor.addNewSensor);
app.post('/getSensorDetails',sensor.getSensorDetails);
app.post('/getLatLong',sensor.getLatLong)
app.post('/deleteSensor',sensor.deleteSensor);
app.post('/deactivateSensor',sensor.deactivateSensor);

app.post('/getHubDetails', hub.getHubDetails);
app.post('/deleteHub', hub.deleteHub);
app.post('/deactivateHub', hub.deactivateHub);
app.post('/activateHub', hub.activateHub);
app.get('/getSensorHealth',sensor.getSensorHealth);
app.post('/activateSensor',sensor.activateSensor);
app.post('/getUserlist',user.getUserlist);
app.post('/getNextData',sensor.getNextData);
app.post('/getDropDownDetails', home.getData);
app.post('/subscribeSensor',sensor.subscribeSensor);
app.post('/unSubscribeSensor', sensor.unSubscribeSensor);
app.post('/getBillList', sensor.showMyBill);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

MongoDB.connect(MongoDB.MONGODB_URL, function () {
    console.log('Connected to mongo at: ' + MongoDB.MONGODB_URL);
});
module.exports = app;