
/*
 * GET users listing.
 */
var mongoURL = "mongodb://localhost:27017/sensor_db";
var mongo = require("./mongo");

exports.list = function(req, res){
  res.send("respond with a resource");
};



exports.getData = function(req,res){
	var json_responses ={};
	console.log("Inside sensor.js addSensor");
	var location = req.param("location");
	var fromDate = req.param("fromDate");
	var toDate = req.param("toDate");
	var fromDate_new = fromDate.substring(1,20)+"Z";
	var toDate_new = toDate.substring(1,20)+"Z";
	var sensorname = req.param("sensorname");
	console.log("from date is : "+fromDate_new);
	console.log("from date is : "+fromDate);
	console.log("to date is : "+toDate);
	
	

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection(location);
		
		var query={time:{$gte:fromDate_new,$lte:toDate_new}};

		var projection = {latitude:1, longitude:1, station:1, time:1};
		projection[sensorname] = 1;
		console.log(projection);
		console.log(query);
		coll.find(query,projection).toArray(function(err, user){
			if (user) {
				//console.log("Data is coming "+JSON.stringify(user));
				var coll = mongo.collection("sensorUsage");
				if(user.length >0)
					{
				
				//inserting unique bill details into the billDetails collection
				coll.findOne({sensorname: sensorname,location: location},function(err, user){
						if (user) {
							console.log("bill details already present");
							
						} else {
							coll.insert({email:req.session.email,location:location, sensorname:sensorname, current:1});
							
						}
					
					});
			}
				json_responses.statusCode = 200;
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

function getUserlist(req, res){
	  console.log("inside userlist.js");
	  var json_responses={};
		mongo.connect(mongoURL, function() {
			console.log('connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('userDetails');
			coll.find({"flag":{$eq :0}}).toArray(function(err, user) {
				if (user) {
					console.log("The data retrieved is: "+ JSON.stringify(user));
					console.log("Success retrieving the data!!");
					json_responses.statusCode= 200;				
					json_responses.allUserlist= user;
					res.send(json_responses);
				} else {
					console.log("Error while fetching the data");
					json_responses.statusCode= 401;
					res.send(json_responses);
					
				}
			});
		});
	};

exports.getUserlist = getUserlist;


