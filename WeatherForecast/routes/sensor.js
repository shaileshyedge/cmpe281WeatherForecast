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
		"activate"   :  activate,
		"deleted"     : "0"
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









/*function deleteSensor(req,res){
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
}*/


/*
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
*/

/*
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
}*/




function deactivateSensor(req,res){
	var sensor_name    = req.param("sensorname");
	var sensorlocation = req.param("location");

	var info =
	{
		"sensor_name"     : sensor_name,
		"sensor_location" : sensorlocation
	};
	var promise = rawDataHandler.deactivateSensor(info);

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




function deleteSensor(req,res){
	var sensor_name    = req.param("sensorname");
	var sensorlocation = req.param("location");

	var info =
	{
		"sensor_name"     : sensor_name,
		"sensor_location" : sensorlocation
	};
	var promise = rawDataHandler.deleteSensor(info);

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




function activateSensor(req,res){
	var sensor_name    = req.param("sensorname");
	var sensorlocation = req.param("location");

	var info =
	{
		"sensor_name"     : sensor_name,
		"sensor_location" : sensorlocation
	};
	var promise = rawDataHandler.activateSensor(info);

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

function getNextData(req,res)
{
	var sensorname = req.param("sensorname");
	var location = req.param("location");
	var city = location + ",us";
	var apikey = '&APPID=fd7b9f6670d006a27179fb4e44530502';
	var request = http.get('http://api.openweathermap.org/data/2.5/forecast?q='+ city + apikey + '&units=imperial', function(response) {
		var body = '';
		var fetch_data = [];

		//Read the data
		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			if (response.statusCode === 200) {
				try {
					//Parse the data
					var weatherAPI = JSON.parse(body);
					var listdata = weatherAPI.list;
					console.log(listdata[0]);
					console.log("Here the list iteration begins" +  listdata.length);
					for(var i = 0; i < listdata.length;i++)
					{
						var datetime = listdata[i].dt_txt.toString().split(" ");
						var info = {
							"sensorname" :   sensorname,
							"location" :     location,
							"temp" :         listdata[i].main.temp,
							"min_temp" :     listdata[i].main.temp_min,
							"max_temp" :     listdata[i].main.temp_max,
							"pressure" :     listdata[i].main.pressure,
							"sea_level" :    listdata[i].main.sea_level,
							"grnd_level" :   listdata[i].main.grnd_level,
							"humidity" :     listdata[i].main.humidity,
							"description" :  listdata[i].weather[0].description,
							"wind_speed" :   listdata[i].wind.speed,
							"wind_deg" :     listdata[i].wind.deg,
							"date" :         datetime[0],
							"time" :         datetime[1]
						};

						var promise = rawDataHandler.addSensorData(info);

						promise.done(function (response) {
							fetch_data.push(info);
						}, function (error) {
							console.log("Error in writing");
						});


					}

					res.send({
						"data"      : fetch_data,
						"statuscode": 200
					});



					//Print the data
					// printWeather(weatherAPI.name, weatherAPI.main.temp);
				} catch(error) {
					//Parse error
					printError(error);
				}
			} else {
				//Status Code error
				console.log("The error izz" + response.statusCode);
				printError({message: 'There was an error getting the weather from ' + city + '. (' + http.STATUS_CODES[response.statusCode] + ')'});
			}
		})
	});

//Connection error
	request.on('error', function (err) {

		printError(err);

	});

};


function printWeather(city, weather) {
	var message = 'In ' + city + ', there is ' + weather + ' degrees.';
	console.log(message);
}

//Print out error messages
function printError(error) {
	console.error(error.message);
}


/*
function activateSensor(req,res){
	var json_responses = {};
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
*/




/*function generateBill(req,res){

	var promise = rawDataHandler.generateBill();

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

}*/


function showMyBill(req,res){
//var user = req.session.useremail;
	var user = "shailesh@gmail.com";
	console.log("User is " + user);
	console.log("Here")
	var promise = rawDataHandler.showBill(user);

	promise.done(function (response) {
		console.log(response);
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

}


function getSensorData(req,res){
	var sensor_name    = req.param("sensorname");
	var sensorlocation = req.param("location");
	var datefrom = req.param("fromDate");
	var dateto  = req.param("toDate")
    console.log("The sensor name is " + sensor_name);
	console.log("Thecloatin is " + sensorlocation);
	var info =
	{
		"sensorname"     : sensor_name,
		"sensorlocation" : sensorlocation,
		"datefrom" : datefrom,
		"dateto" : dateto
	};
	var promise = rawDataHandler.getSensorData(info);

	promise.done(function (response) {
		console.log(response);
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







exports.activateSensor = activateSensor;
exports.deactivateSensor = deactivateSensor;
exports.deleteSensor = deleteSensor;
exports.getSensorDetails = getSensorDetails;
exports.addNewSensor = addNewSensor;
exports.getNextData = getNextData;
exports.showMyBill = showMyBill;
exports.getSensorData = getSensorData;