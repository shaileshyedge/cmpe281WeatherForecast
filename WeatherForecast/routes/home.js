var mongoURL = "mongodb://cmpe281:cmpe281@ds157677.mlab.com:57677/cmpe281";
var mongo = require("./mongo");
var rawDataHandler = require('../routes/RawdataHandler');
var express = require('express');
//var router = express.Router();
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


function addUser(req, res){
	var data = {
		firstname : req.param("firstname"),
		lastname : req.param("lastname"),
		password : req.param("password"),
		cpswd : req.param("cpswd"),
		email : req.param("email"),
		phone : req.param("phone"),
		address : req.param("address"),
		state : req.param("state"),
		country : req.param("country"),
		city : req.param("city"),
		gender : req.param("gender"),
		isAdmin : '0',
		credits : 100
	};

	var promise = rawDataHandler.registerUsers(data);
	promise.done(function (response) {
		res.send({
			"statusCode": 200
		});
	}, function (error) {
		res.send({
			"statusCode": 500,
			"error" : error
		});
	});
}



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

		if(response == null)
		{
			res.send({
				"data"      : response,
				"statuscode": 404
			})
		}
		else {
			if (response.isAdmin == "0") {
				req.session.useremail = response.email;
				req.session.userfirstname = response.firstname;
				req.session.userlastname = response.lastname;
			}
			else if (response.isAdmin == "1") {
				req.session.adminemail = response.email;
				req.session.adminfirstname = response.firstname;
				req.session.adminlastname = response.lastname;
			}

			res.send({
				"data": response,
				"statuscode": 200
			});
		}
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


function payBill(req,res)
{
	var info =
	{
		"email" : req.session.useremail
	};
	var promise = rawDataHandler.payBill(info);

	promise.done(function (response) {
		res.send({
			"statusCode": 200,
			"response" : response
		});
	}, function (error) {
		res.send({
			"statusCode": 500,
			"error" : error
		});
	});

};

function pay1Bill(req,res) {
	
	console.log("Paying My Bill");
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



exports.payBill	= payBill;
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