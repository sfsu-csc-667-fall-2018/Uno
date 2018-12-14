$(function(){

    var socket = io()

    $(function () {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', {message:$('#m').val(),socketid:socket.id});
      $('#m').val('');
      return false;
    });
    });

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg.username+": "+msg.message));
    });

});

