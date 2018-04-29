$(function () {
    var socket = io();
    socket.on('admin_message', function (msg) {
        $('#messages').text(msg);
    });
    socket.on('admin_ip', function (msg) {
        $('#ip').text(msg);
    });
    socket.on('admin_id', function (msg) {
        $('#id').text(msg);
    });
});