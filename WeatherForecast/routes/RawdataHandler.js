/**
 * Created by SHAILESH-PC on 11/3/2016.
 */
var MongoDB = require("../routes/MongoDBHandler");

var Q = require('q');



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


exports.insertBill = function (info) {
    var deferred = Q.defer();
    var cursor = MongoDB.collection("bill").insert(info);
  //  var cursor = MongoDB.collection("bill").upda
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


exports.showBill = function(email)
{
    var totalBill = 0;

    var deferred = Q.defer();
    var cursor = MongoDB.collection("bill");
    var json = {};

    var usersdata = [];
    cursor.find({"email" : email}).each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }
        if (doc != null)
        {

            var d1 = new Date(doc.date);
            var d2 = new Date();
            var diff = parseInt((d2-d1)/(1000*3600*24)) + 1;
            console.log("Date is zzzz" + diff);
            //doc.cost = doc.cost + Number(doc.cost);
            totalBill = Number(totalBill) + Number(doc.cost);
            //doc.push(totalBill);
            usersdata.push(doc);
        }
        else {
            json.usersdata = usersdata;
            json.totalBill = totalBill;
            deferred.resolve(json);
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








exports.getSensorUsage = function()
{
    var deferred = Q.defer();
    var cursor = MongoDB.collection("bill").aggregate({$group : {_id : "$sensorname", total :{$sum : "$count" }}});
    var bills_new = {};
    cursor.each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }
        if (doc != null) {

            if(bills_new[doc.sensorname]) {
                bills_new[doc.sensorname] = bills_new[doc.sensorname] + doc.count;
            } else {
                bills_new[doc.sensorname] = doc.count;
            }
        }
        else
        {
            deferred.resolve(bills_new);
        }
    });
    return deferred.promise;
};



exports.showAllBills = function()
{
    var deferred = Q.defer();
    var cursor = MongoDB.collection("bill").aggregate({ "$group" : {"_id" : "$email", "total" : {"$sum" : "$cost" }} });
    var bills_new = {};
    cursor.each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }
        if (doc != null) {
            console.log("The doc here is " + doc.total);
            if(bills_new[doc.email]) {
                bills_new[doc.email] = bills_new[doc.email] + doc.cost;
            } else {
                bills_new[doc.email] = doc.cost;
            }
        }
        else
        {
            deferred.resolve(bills_new);
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
        console.log("User is" + user);
        deferred.resolve(user);
    }).catch(function (error) {
        console.log("Error is" + error);
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

exports.updateBill = function (info) {
    console.log("in update Bill");
    console.log(info);
    var deferred = Q.defer();
    var cursor = MongoDB.collection("bill").update({"email" : info.email,"sensorname" : info.sensorname,"sensor_location":info.sensorlocation }, {$inc : {"count" : 1,"cost" : 2}});
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};


exports.payBill = function (info) {
    console.log("in Pay Bill");
    console.log(info);
    var deferred = Q.defer();
    var cursor = MongoDB.collection("bill").update({"email" : info.email}, {$set : {"cost": 0 }},{multi:true});
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

exports.getDropDownOptions = function(info){
    var deferred = Q.defer();
    var found = [];
    var cursor = MongoDB.collection("subscription").find({"email" : info.email});
    console.log(cursor.size);
    cursor.each(function (error, user){
        if (error) {
            deferred.reject(error);
        }
        if (user != null) {
            found.push(user);
        }
        else {
            deferred.resolve(found);
        }
    });
    return deferred.promise;
}

exports.subscribeSensor = function (info) {
    var deferred = Q.defer();
    console.log(info.sensor_location);
    console.log(info.sensor_name);
    var cursor = MongoDB.collection("subscription").insert({"sensorname" : info.sensor_name, "location" : info.sensor_location,"email" : info.email,"date" : info.date, "activate" : info.activate, "cost" : info.cost});
    cursor.then(function (doc) {
        deferred.resolve(doc);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;

};

exports.unSubscribeSensor = function (info) {
    var deferred = Q.defer();
    console.log("hERE IS " + info.email + info.sensor_name);
    var cursor = MongoDB.collection("subscription").remove({"email" : info.email, "sensorname" : info.sensor_name});
    cursor.then(function (doc) {
        deferred.resolve(doc);
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



exports.getSensorData = function(info)
{   console.log("Reached here");
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensordata").find({"sensorname" : info.sensorname, "location" : info.sensorlocation});
    console.log("Reached here2");
    var json = {};
    var sensorData = [];
    cursor.each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }

        if (doc != null) {

            var db_date = doc.date.toString().split("-");
            var d1 = info.datefrom.toLocaleString().split("-");
            var d2 = info.dateto.toLocaleString().split("-");
            var a = d1[0].substr(1,5);
            var b = d1[1];
            var c = Number(d1[2].substr(0,2));
            var d = d2[0].substr(1,5);
            var e = d2[1];
            var f = Number(d2[2].substr(0,2));
            var from = new Date(Number(a), Number(b)-1,c);  // -1 because months are from 0 to 11
            var to   = new Date(Number(d), Number(e)-1,f);
            //var db_date = new Date(d[0],d1[1] - 1,d1[2]);
            var check = new Date(Number(db_date[0]), Number(db_date[1])-1, Number(db_date[2]));
            console.log("Reached here7");
            if (check >= from && check <= to) {
                sensorData.push(doc);
            }
        }
        else
        {
            json.sensorData = sensorData;
            deferred.resolve(sensorData);
        }
    });
    return deferred.promise;
};



exports.getLatLong = function(info)
{   console.log("Reached here");
    var deferred = Q.defer();
    var cursor = MongoDB.collection("sensordata").find({});

    var json = [];
    var sensorData = [];
    cursor.each(function (error, doc) {
        if (error) {
            deferred.reject(error);
        }

        if (doc != null) {
                sensorData.push(doc.latitude,doc.longitude);
            json.push(sensorData);

        }
        else
        {
            deferred.resolve(json);
        }
    });
    return deferred.promise;
};

