/**
 * Created by SHAILESH-PC on 11/3/2016.
 */
var MongoDB = require("../routes/MongoDBHandler");

var Q = require('q');

/*
exports.feeddata = function(info)
{
var deferred = Q.defer();
var cursor = MongoDB.collection("temperature").insert(info);
cursor.then(function (data) {
    deferred.resolve(data);
}).catch(function (error) {
    deferred.reject(error);
});
return deferred.promise;
//return true;
};

exports.registersensor = function(info)
{
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensors").insert(info);
    cursor.then(function (data) {
        deferred.resolve(data);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
//return true;
};



exports.getAllSensors = function()
{
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensors").find({});

    var usersdata = [];
    cursor.each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }
        if (doc != null) {
            usersdata.push(doc);
        } else {
            deferred.resolve(usersdata);
        }
    });
    return deferred.promise;
};


exports.getAllUsers = function()
{
    var deferred = Q.defer();
    var cursor = MongoDB.collection("users").find({});

    var usersdata = [];
    cursor.each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }
        if (doc != null) {
            usersdata.push(doc);
        } else {
            deferred.resolve(usersdata);
        }
    });
    return deferred.promise;
};

exports.registerUsers = function (info) {
    var deferred = Q.defer();
    var cursor = MongoDB.collection("users").insert(info);
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
    //return true;
};

exports.subscribeSensor = function (info) {
    var deferred = Q.defer();
    var cursor = MongoDB.collection("subscribe").insert(info);
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
    //return true;
};

*/


exports.adddata = function (info) {
    var deferred = Q.defer();
    var cursor = MongoDB.collection("data").insert(info);
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
    //return true;
};


exports.addSensorData = function(info) {
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensordata").insert(info);
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
    //return true;
};






exports.getAllUsers = function()
{
    var deferred = Q.defer();
    var cursor = MongoDB.collection("users");

    var usersdata = [];
    cursor.find({"isAdmin":{$eq : "0"}}).each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }
        if (doc != null) {
            usersdata.push(doc);
        }
        else {
            deferred.resolve(usersdata);
        }
    });
    return deferred.promise;
};

exports.getAllSensors = function()
{
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensormaster").find({"deleted" : "0"});

    var sensorData = [];
    cursor.each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }
        if (doc != null) {
            sensorData.push(doc);
        }
        else
        {
            deferred.resolve(sensorData);
        }
    });
    return deferred.promise;
};

exports.checkLogin = function(info)
{
    var deferred = Q.defer();
    var found = null;
    var cursor = MongoDB.collection("users").find({"email" : info.email,"password" : info.password});
    console.log(cursor.size);
    cursor.each(function (error, user) {
        console.log("--Hi--");
        if (error) {
            deferred.reject(error);
        }
        if (user != null) {
            found = user;
        } else {
            deferred.resolve(found);
        }
    });
    return deferred.promise;
};


exports.registerUsers = function (info) {
    console.log("in raw data handler method");
    var deferred = Q.defer();
    var cursor = MongoDB.collection("users").insert(info);
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};


exports.addNewSensor = function (info) {
    console.log("in raw data handler method");
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensormaster").insert(info);
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};

exports.deactivateSensor = function (info) {
    console.log("in raw data handler method");
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensormaster").update({"sensorname" : info.sensor_name, "location" : info.sensor_location}, {$set : {"activate" : "inactive"}});
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};


exports.activateSensor = function (info) {
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensormaster").update({"sensorname" : info.sensor_name, "location" : info.sensor_location}, {$set : {"activate" : "active"}});
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};


exports.deleteSensor = function (info) {
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensormaster").update({"sensorname" : info.sensor_name, "location" : info.sensor_location}, {$set : {"deleted" : "1"}});
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};






exports.loadSensorData = function(info)
{
    var city = info.location + ",us";
    var sensorname = info.sensorname;
    var location = info.location;
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
                            "sensorname" :   info.sensorname,
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

                        var promise = addSensorData(info);

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
exports.getTemperatureData = function()
{
    var deferred = Q.defer();
    var cursor = MongoDB.collection("temperature").find({});

    var usersdata = [];
    cursor.each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }
        if (doc != null) {
            usersdata.push(doc);
        } else {
            deferred.resolve(usersdata);
        }
    });
    return deferred.promise;
};

exports.getMyBill = function(info)
{   console.log("The data metioned is" + info.user);
    var deferred = Q.defer();
    var cursor = MongoDB.collection("subscribe").find({"user" : info.user});

    var usersdata = [];
    cursor.each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }
        if (doc != null) {
            usersdata.push(doc.timestamp);
        } else {
            deferred.resolve(usersdata);
        }
    });
    return deferred.promise;
};
*/



