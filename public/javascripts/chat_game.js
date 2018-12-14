$(function(){

    $(function () {
    $('form').submit(function(){
      socket.emit('chat message game', {message:$('#m').val(),socketid:socket.id,gameid:document.URL.slice(document.URL.indexOf("=")+1)});
      $('#m').val('');
      return false;
    });
    });

    socket.on('chat message game', function(msg){
        console.log(msg.message);
        $('#messages').append($('<li>').text(msg.message));
    });

});
