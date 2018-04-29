// app.js

require("./data_model.js")
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

server.listen(4200, function () {
    console.log('listening on localhost:4200');
});

io.on('connection', function (client) {

    var clientIP = client.handshake.address;
    var clientID = client.id;

    client.on('disconnect', function () {
        console.log('Client disconnected');
    });

    client.on("user_data", function (msg) {
        var collection = db.collection('userResponse');
        collection.insert(msg);
    });

    client.on('chat message', function (msg) {

        io.emit('admin_message', msg);
        io.emit('admin_ip', clientIP);
        io.emit('admin_id', clientID);
        console.log("Message from " + clientIP + " by " + clientID + "sent is " + msg);
    });
});