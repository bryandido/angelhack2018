$(function () {
    var data = {}
    var socket = io();
    socket.on('admin_message', function (msg) {
        $('#messages').text(msg);
        name = msg["profile"]["name"]
        if (data[name] === undefined){
            $('#list').append('<tr id="' + name + '"/>').html("<td>" + msg["profile"]["time"] +"</td><td>" + name + "</td><td>" + msg["profile"]["message"] + "</td>")
        }else{
            data[name] = {
                time: msg["profile"]["time"],
                location: msg["profile"]["location"]
                }
            $('#'+name).html("<td>ex.</td><td>" + name + "</td><td>Otto</td>")
        }
    });
    socket.on('admin_ip', function (msg) {
        $('#ip').text(msg);
    });
    socket.on('admin_id', function (msg) {
        $('#id').text(msg);
    });
});