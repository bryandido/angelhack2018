$(function () {
    var data = {}
    var socket = io();
    socket.on('admin_message', function (msg) {
        $('#messages').text(msg);
        name = msg["profile"]["name"]
        if (data[name] === undefined){
            $('#list').append('<tr id="' + name + '"><td>' 
                + msg["time"] +"</td><td>" + name + "</td><td>" + msg["mes"] + "</td></tr>")
            data[name] = {}
        }else{
            data[name] = {
                time: msg["profile"]["time"],
                location: msg["profile"]["location"]
                }
            $('#'+name).html('<td>' + msg["time"] +"</td><td>" + name + "</td><td>" + msg["mes"] + "</td>")
        }
    });
    socket.on('admin_ip', function (msg) {
        $('#ip').text(msg);
    });
    socket.on('admin_id', function (msg) {
        $('#id').text(msg);
    });
});