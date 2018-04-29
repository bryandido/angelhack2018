// app.js

//var mc = require("./data_model.js")
var MongoClient = require('mongodb').MongoClient;
// Connect to the db
var db_c
MongoClient.connect("mongodb://localhost:27017/emergencyDB", function(err, db) {
  if(!err) {
    db_c = db;
    console.log("Connected to emergencyDB");
  }
});
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var ss = require('socket.io-stream');
var path = require('path');
var adminID;

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

app.get('/post', function (req, res, next) {
    res.sendFile(__dirname + '/post.html');
});

app.get('/admin', function (req, res, next) {
    res.sendFile(__dirname + '/admin.html');
});

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/assets/index.html');
});

server.listen(4200, function(){
    console.log('listening on localhost:4200');
});

io.on('connection', function (client) {

    var clientIP = client.handshake.address;
    var clientID = client.id;

    client.on('disconnect', function () {
        console.log('Client disconnected');
    });

    client.on("user_data", function(msg){
        var collection = db_c.collection('userResponse'); // mongoclient.db
        collection.insert(msg);
        client.emit('admin_message', msg);
    });

    client.on('chat message', function (msg) {

        io.emit('admin_message', msg);
        msg = {"name":"shafi", "time": new Date(), "message":"hi whats up", "location":[1,2]}
        io.emit('admin_ip', clientIP);
        io.emit('admin_id', clientID);
        console.log("Message from " + clientIP + " by " + clientID + "sent is " + msg);
    });
});