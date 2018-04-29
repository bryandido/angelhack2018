$(function () {
    var data = {}
    var socket = io();
    socket.on('admin_message', function (msg) {
        name = msg["name"].split(" ").join("_")
        console.log(msg["mes"])
        if (data[name] === undefined){
            $('#list').append('<tr id="' + name + '"><td>' 
                + msg["time"] +"</td><td>" + name + "</td><td>" + msg["mes"] + "</td><td>" +
                 msg["type"] + "</td></tr>")
            data[name] = {}
        }else{
            data[name] = {
                time: msg["time"],
                location: msg["location"]
                }
            $('#'+name).html('<td>' + msg["time"] +"</td><td>" + name + "</td><td>" + msg["mes"] + "</td><td>" +
                 msg["type"] + "</td></tr>")
        }
        loc = {};
        loc[name] = {
            lat: msg["location"][0], long:msg["location"][1]
        }
        myMap(loc);
    });
    socket.on('admin_ip', function (msg) {
        $('#ip').text(msg);
    });
    socket.on('admin_id', function (msg) {
        $('#id').text(msg);
    });
});