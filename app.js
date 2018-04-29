// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var ss = require('socket.io-stream');
var path = require('path');
var adminID;

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req,res,next){
    res.sendFile(__dirname + '/admin.html');
});

server.listen(4200, function(){
    console.log('listening on localhost:4200');
});

io.on('connection', function(client) {
    var clientIP = client.handshake.address;
    var clientID = client.id;
    console.log('Client '+ clientID +' connected from '+clientIP);
    client.on('disconnect', function(){
        console.log('Client disconnected');
    });
    client.on('chat message', function(msg){
            io.emit('admin_message',msg)
    });
    ss(client).on('record', function(audio,data){
        var filename = path.basename(data.name);
        stream.pipe(fs.createWriteStream(filename));
    });
});