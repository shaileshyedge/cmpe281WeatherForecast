var mongoURL = "mongodb://cmpe281:cmpe281@ds157677.mlab.com:57677/cmpe281";
var mongo = require("./mongo");
var rawDataHandler = require('../routes/RawdataHandler');
var express = require('express');
var router = express.Router();
var Q = require('q');
var fs = require('fs');
var ejs = require("ejs");
//var weather = require ('openweathermap');
var http = require('http');

function signup(req,res) {
	res.render("signup");
}

function login(req,res) {
	res.render("login");
}

function billing(req,res) {
	res.render("billing",{firstname:req.session.userfirstname, lastname:req.session.userlastname});
}

function map(req,res) {
	res.render("map",{firstname:req.session.userfirstname, lastname:req.session.userlastname});
}
function index(req,res) {
	res.render("index");
}

function userDashboard(req,res) {
	res.render("userDashboard",{firstname:req.session.userfirstname, lastname:req.session.userlastname});
}

function adminDashboard(req,res) {
	res.render("adminDashboard",{firstname:req.session.adminfirstname, lastname:req.session.adminlastname});
}

function logout(req,res) {
	req.session.destroy();
	res.render("index");
}

function requestData(req,res) {
	res.render("requestSensorData");
}
function getBillList(req,res) {
	  console.log("inside getBill List of home.js");
	  var json_responses={};
		mongo.connect(mongoURL, function() {
			console.log('connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('sensorUsage');
			coll.find({"current":{$eq :1},"email":req.session.email}).toArray(function(err, user) {
				if (user) {
					console.log("The data retrieved is: "+ JSON.stringify(user));
					console.log("Success retrieving the data!!");
					json_responses.statusCode  = 200;
					//json_responses = {statusCode : 200};	
					console.log("session variable of counter is : "+req.session.counter);
					json_responses.billDetails= user;
					console.log("response from home.js getBillList: " +JSON.stringify(user));
					//json_responses = {billDetails : user};
					res.send(json_responses);
				} else {
					console.log("Error while fetching the data");
					json_responses = {statusCode : "401"};
					res.send(json_responses);
					
				}
			});
		});
}

function addUser(req, res){
	var json_responses={};
	console.log("Inside home addUser");
	var firstname = req.param("firstname"); 
	var lastname = req.param("lastname"); 
	var password = req.param("password");
	var cpswd = req.param("cpswd");
	var email = req.param("email");
	var phone = req.param("phone");
	var address = req.param("address");
	var state = req.param("state");
	var country = req.param("country");
	var city = req.param("city");
	var gender = req.param("gender");

console.log("firstname: "+firstname);
console.log("gender: "+gender);

mongo.connect(mongoURL, function() {
	console.log('connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('userDetails');
	
	coll.insert({firstname : firstname, lastname : lastname, password : password, cpswd : cpswd, email : email, phone : phone, address : address, state : state, country : country, city : city, gender : gender, flag:0}, function(err,user){
		if (user) {
			console.log("values successfully inserted");
			json_responses.statusCode= 200;
			res.send(json_responses);
		} 
	});
});
}

function userLogin(req,res){
	var json_responses={};
	console.log("In home login");
	console.log("email: "+req.param("email"));
	console.log("pwd: "+req.param("password"));
	var login = req.param("login");
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userDetails');
		console.log("Fetching data from db");
		coll.findOne({email: req.param("email"),password: req.param("password")}, function(err, user){
			if(user) {
				var currentdate = new Date();
				console.log("currentHour is : "+currentdate.getHours());
				if(login == "userLogin")
					{
				req.session.useremail = user.email;
				req.session.userfirstname = user.firstname;
				req.session.userlastname = user.lastname;
					}
				else if(login == "adminLogin")
					{
					req.session.adminemail = user.email;
					req.session.adminfirstname = user.firstname;
					req.session.adminlastname = user.lastname;
					}
				//console.log("session set to : "+req.session.email);
				console.log("From login in mongo: "	+ JSON.stringify(user));
				json_responses.statusCode= 200;
				json_responses.data= user;
				console.log("Returning value(home.js): " + JSON.stringify(json_responses));
				res.send(json_responses);
			} else {
				json_responses.statusCode= 404;
				console.log("Returning errorv(home.js): " + JSON.stringify(json_responses));
				res.send(json_responses);
			}
		});
	});
};


function userLogin(req,res)
{
	console.log("email: "+req.param("email"));
	console.log("pwd: "+req.param("password"));
	//var login = req.param("login");
	var email = req.param("email");
	var password = req.param("password");

	var info =
	{
		"email" : email,
		"password" : password
	}

	var promise = rawDataHandler.checkLogin(info);

	promise.done(function (response) {
		//console.log("The data is" + response.firstname);

		if(response.isAdmin == "0")
		{
			req.session.useremail = response.email;
			req.session.userfirstname = response.firstname;
			req.session.userlastname = response.lastname;
		}
		else if(response.isAdmin == "1")
		{
			req.session.adminemail = response.email;
			req.session.adminfirstname = response.firstname;
			req.session.adminlastname = response.lastname;
		}

		res.send({
			"data"      : response,
			"statuscode": 200
		});
	}, function (error) {
		res.send({
			"data" : null,
			"statuscode": 404
		});
	});
}

function getData(req,res){
	var json_responses={};
	console.log("Inside sensor.js addSensor");	
	var location = req.param("location");
	console.log("location name is : "+location);

	mongo.connect(mongoURL, function(){	
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection("sensorMetadata");
	
		console.log("The collection is: "+coll);
		
		coll.find({activate:{$eq :"active"},deleted:{$eq:0},location:{$eq:location}},{"sensorname":1}).toArray(function(err, user){

			if (user) {
				console.log("success");
				console.log("What is user: "+JSON.stringify(user));
				json_responses.statusCode= 200;
				json_responses.schools= user;
				res.send(json_responses);
				
			} else {
				console.log("returned false");
				json_responses.statusCode= 401;
				res.send(json_responses);
			}
		});
	});
};	

function resetBill(req,res) {
	
	console.log("Inside reset bill module");
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log("email is : "+req.session.email);
		
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensorUsage');
		req.session.counter = 0;
		coll.update({email: req.session.email}, {$set: {current: 0}},{multi:true},function(err,user){
			if (user) {
				console.log("Success in reseting the bill");
				json_responses.statusCode =200;
				res.send(json_responses);
			} else {
				json_responses.statusCode = 401;				
				console.log("couldn't reset the bill.. Sorry");
				res.send(json_responses);
			}
		});
	});
};

function storeDataFromURl(req,res){
	var loc = $scope.location ;
	var sensorName = $scope.sensorName;
	var url = "http://erddap.cencoos.org/erddap/tabledap/"+loc+".json?time,latitude,longitude,"+sensorName+"&time>=2015-01-13T00:00:00Z&time<=2016-01-13T18:45:00Z"
	http.get(url, function(res) {
		  //console.log(res);
		  var body = '';
		  res.on('data',function(chunk){
			  body+=chunk;
		  });
		  res.on('end',function(){
			  var data = JSON.stringify(body);
			  //console.log(data);
			  var first = body.substring(0,body.indexOf("\n")+1);
			  var second = body.substring(body.indexOf("\n")+1);
			  var third = second.substring(second.indexOf("\n")+1);
			  body=first+third;
			  console.log("---------------JSON processing method	--------------------\n");
			  var Converter = require("csvtojson").Converter;
			  var converter = new Converter({});
			  converter.fromString(body, function(err,jsondata){

			//Mongo Goes here
			console.log("Mongo insert begins");
			var insertData = function(db, callback) {
			db.collection('SensorData').insert(jsondata, function(err, doc) {
				if (doc != null) {
					console.log(doc);
					} else {
						console.log("--------_ERROR--------");
						}
					});
				};
			MongoClient.connect(url, function (err, db) {
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
				} else {
				//HURRAY!! We are connected. :)
			console.log('Connection established to', url);
			// Stores the JSON data collected from API to MongoDB in collection "SensorData"
			insertData(db,function(){db.close();});
						}
			});

		});
			    
		  });
		  
			MongoClient.connect(url, function (err, db) {
				if (err) {
					console.log('Unable to connect to the mongoDB server. Error:', err);
				} else {
					//HURRAY!! We are connected. :)
					console.log('Connection established to', url);
					getStationName(db,function(){db.close();});

				}
			});

		  
		}).on('error', function(e) {
		  console.log(e);
	});

	
}

exports.resetBill = resetBill;
exports.getBillList = getBillList;
exports.getData = getData;
exports.requestData = requestData;
exports.logout = logout;
exports.adminDashboard = adminDashboard;
exports.map = map;
exports.billing = billing;
exports.userDashboard = userDashboard;
exports.userLogin = userLogin;
exports.signup= signup;
exports.login= login;
exports.index= index;
exports.addUser = addUser;