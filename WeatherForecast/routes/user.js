
/*
 * GET users listing.
 */
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

exports.list = function(req, res){
  res.send("respond with a resource");
};



function getUserlist(req, res){
		var promise = rawDataHandler.getAllUsers();
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

exports.getUserlist = getUserlist;


