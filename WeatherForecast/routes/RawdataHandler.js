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



