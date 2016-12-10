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

function addNewSensor(req, res){
	var json_responses = {};
	var sensorName =  req.param("sensorName");
	var description = req.param("description");
	var sensorType =  req.param("sensorType");
	var subscriptionCost = req.param("subscriptionCost");
	var costPerReq = req.param("costPerReq");
	var activate =    req.param("activate");
	var location =    req.param("location");
	var latitude =    req.param("latitude");
	var longitude =   req.param("longitude");


	var info =
	{
		"sensorname" : sensorName,
		"description": description,
		"sensortype" :  sensorType,
		"subscriptionCost" : subscriptionCost,
		"costPerReq" :costPerReq,
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

function subscribeSensor(req,res)
{
	var sensor_name    = req.param("sensorname");
	var sensorlocation = req.param("location");
	var subscriptionCost = req.param("subscriptionCost");
	var date = new Date();

	var info =
	{
		"sensor_name"     : sensor_name,
		"sensor_location" : sensorlocation,
		"email" : req.session.useremail,
		"date" : date,
		"activate" : "active",
		"cost"  : Number(subscriptionCost)
	};

	var bill =
	{
		"sensorname" : sensor_name,
		"sensor_location" : sensorlocation,
		"email" : req.session.useremail,
		"count" : 1,
		"cost"  : Number(subscriptionCost)
	};

	var promise = rawDataHandler.subscribeSensor(info);
	var promise2 = rawDataHandler.insertBill(bill);

	Q.all([promise,promise2]).done(function (response) {
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



function payBill (req,res)
{
	var sensor_name    = req.param("sensorname");
	var sensorlocation = req.param("location");
	var email = req.session.useremail;


	var bill =
	{
		"sensorname" : sensor_name,
		"sensor_location" : sensorlocation,
		"email" : email,
		"amount"  : 10
	}

	var promise = rawDataHandler.payBill(bill);
	var promise2 = rawDataHandler.updateCredits(bill);

	Q.all([promise,promise2]).done(function (response) {
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




function unSubscribeSensor(req,res){

	var info =
	{
		"sensor_name" : req.param("sensorname"),
		"email" : req.session.useremail
	};
	var promise = rawDataHandler.unSubscribeSensor(info);

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

}

function getSensorHealth(req,res)
{
	var sensortype = ["Temperature","Pressure","Humidity","Sea Level", "Wind Speed"];
	var info = [];

	for (var i = 0; i < 5; i++)
	{
		var min = 10;
		var max = 100;
		var randomval = Math.floor(Math.random() * (max - min + 1)) + min;
		var val =
		{
			"sensortype" : sensortype[i],
			"val"        : randomval
		};
		info.push(val);
	}

	res.send({
		"statusCode": 200,
		"data" : info
	});
}


function getDropDownOptions(req,res){
	var info ={
		"email" : req.session.useremail
	};
	var promise = rawDataHandler.getDropDownOptions(info);

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

}




function getSensorUsage(req,res){

	var promise = rawDataHandler.getSensorUsage();

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

}



function showAllBills(req,res){
	var info ={
		"email" : req.session.useremail
	};
	var promise = rawDataHandler.showAllBills(info);

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



function showMyBill(req,res){
   var user = req.session.useremail;
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

	var bill  =
	{
		"email" : req.session.useremail,
		"sensorname"     : sensor_name,
		"sensorlocation" : sensorlocation,
		"cost"  : "5"
	}
	var promise = rawDataHandler.getSensorData(info);
	var promise2 = rawDataHandler.updateBill(bill);

	promise.all(promise,promise2).done(function (response) {
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




function getLatLong(req,res){
	var promise = rawDataHandler.getLatLong();

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
exports.subscribeSensor = subscribeSensor;
exports.unSubscribeSensor = unSubscribeSensor;
exports.getDropDownOptions = getDropDownOptions;
exports.showMyBill = showMyBill;
exports.getSensorData = getSensorData;
exports.getLatLong = getLatLong;
exports.getSensorHealth = getSensorHealth;