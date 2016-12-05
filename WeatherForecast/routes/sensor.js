var mongoURL = "mongodb://localhost:27017/sensor_db";
var mongo = require("./mongo");
var rawDataHandler = require('../routes/RawdataHandler');
var express = require('express');
//var router = express.Router();
var Q = require('q');
var fs = require('fs');
var ejs = require("ejs");
//var weather = require ('openweathermap');
var http = require('http');

/*
function addNewSensor(req, res){
	var json_responses = {};
	console.log("Inside sensor.js addSensor");
	var sensorName = req.param("sensorName"); 
	var description = req.param("description"); 
	var sensorType = req.param("sensorType");
	var activate = req.param("activate");
	var location = req.param("location");

	console.log("location is : "+location);
	console.log("sensor is : "+sensorName);
	

	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('sensorMetadata');		
		coll.update({"location":{$eq: location},"sensorname" : {$eq: sensorName}},{ $set : {"deleted":0, "activate": activate}},function(err,user){
			if(user){
			
				
						console.log("The data retrieved is: "+ JSON.stringify(user));
						console.log("Success adding the sensor!!");
						json_responses.statusCode= 200;				
						json_responses.sensorStatus= user;
						res.send(json_responses);	
					
				}
			else{
				console.log("error while adding sensor \n");
				json_responses.statusCode= 404;
				res.send(json_responses);	
			}
			});
	})
}

*/


function addNewSensor(req, res){
	var json_responses = {};
	var sensorName =  req.param("sensorName");
	var description = req.param("description");
	var sensorType =  req.param("sensorType");
	var activate =    req.param("activate");
	var location =    req.param("location");
	var latitude =    req.param("latitude");
	var longitude =   req.param("longitude");

	var info =
	{
		"sensorname" : sensorName,
		"description": description,
		"sensortype" :  sensorType,
		"location"   :  location,
		"latitude"   : latitude,
		"longitude"  : longitude,
		"activate"   :  activate
	};

	var promise = rawDataHandler.addNewSensor(info);
	promise.done(function (response) {
		res.send({
			"statusCode": 200,
			"data" : response
		});
	}, function (error) {
		res.send({
			"statusCode": 500,
			"error" : error
		});
	});
}


function getSensorDetails(req,res){
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		/*var coll = mongo.collection('sensorMetadata');
		coll.find({"deleted":0}).toArray(function(err, user) {
			
			if (user) {
				console.log("The data retrieved is: "+ JSON.stringify(user));
				console.log("Success retrieving the data!!");
				json_responses.statusCode= 200;				
				json_responses.allSensorList= user;
				res.send(json_responses);
			} else {
				console.log("Error while fetching the data");
				json_responses.statusCode= 401;
				res.send(json_responses);
				
			}
		});*/
		var promise = rawDataHandler.getAllSensors();
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
	});
}


function deleteSensor(req,res){
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("sensorname"));
		console.log("sensor location is : "+req.param("location"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensorMetadata');
		coll.update({"sensorname":req.param("sensorname") , "location":req.param("location")} , { $set : {"deleted":1}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				res.statusCode = 200;
				res.send(json_responses);
			} else {
				res.statusCode = 401;				
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});
}


function deactivateSensor(req,res){
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("sensorname"));
		console.log("sensor location is : "+req.param("location"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensorMetadata');
		coll.update({"sensorname":req.param("sensorname") , "location":req.param("location")} , { $set : {"activate":"inactive"}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				json_responses.statusCode = 200;
				res.send(json_responses);
			} else {
				json_responses.statusCode = 401;				
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});	
}

function activateSensor(req,res){
	var json_responses = {};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("sensorname"));
		console.log("sensor location is : "+req.param("location"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensorMetadata');
		coll.update({"sensorname":req.param("sensorname") , "location":req.param("location")} , { $set : {"activate":"active"}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				json_responses.statusCode = 200;
				res.send(json_responses);
			} else {
				json_responses.statusCode = 401;				
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});
}


exports.activateSensor = activateSensor;
exports.deactivateSensor = deactivateSensor;
exports.deleteSensor = deleteSensor;
exports.getSensorDetails = getSensorDetails;
exports.addNewSensor = addNewSensor;