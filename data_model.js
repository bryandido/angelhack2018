var MongoClient = require('mongodb').MongoClient;
global.db_connection; 

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/emergencyDB", function(err, db) {
  if(!err) {
    db_connection = db;
    console.log("Connected to emergencyDB");
  }
});