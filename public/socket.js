$(function () {
    var data = {}
    var socket = io();
    socket.on('admin_message', function (msg) {
        $('#messages').text(msg);
        name = msg[name]  
        if (data[name] ===undefined)
            $('#list').append('<tr id=" ' + name + '"/>')
        data[name] = {
            time: msg["time"],
            location: msg["location"]
            }
        $('#'+name ).html("<td>ex.</td><td>" + name + "</td><td>Otto</td>")
    });
    socket.on('admin_ip', function (msg) {
        $('#ip').text(msg);
    });
    socket.on('admin_id', function (msg) {
        $('#id').text(msg);
    });
});