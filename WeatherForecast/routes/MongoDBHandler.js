/**
 * Created by SHAILESH-PC on 11/3/2016.
 */
const MONGODB_URL = "mongodb://cmpe281:cmpe281@ds157677.mlab.com:57677/cmpe281";
// const MONGODB_URL = "mongodb://localhost:27017/sensor";
exports.MONGODB_URL = MONGODB_URL;
var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var pool = {
    _collections: {}
};
pool.getCollection = function (name) {
    if (!this._collections[name]) {
        this._collections[name] = db.collection(name);
    }
    return this._collections[name];
};


/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function (url, callback) {
    MongoClient.connect(MONGODB_URL, {
        options: {
            server: {
                auto_reconnect: true,
                poolSize: 10,
                socketOptions: {
                    keepAlive: 1
                }
            },
            db: {
                numberOfRetries: 10,
                retryMiliSeconds: 1000
            }
        }
    }, function (err, _db) {
        if (err) {
            throw new Error('Could not connect: ' + err);
        }
        db = _db;
        connected = true;
        callback(db);
    });
};

/**
 * Returns the collection on the selected database
 */
exports.collection = function (name) {
    return pool.getCollection(name);
};
