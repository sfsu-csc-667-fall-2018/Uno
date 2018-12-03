(() => {

   $('#create-game').on('submit', event => {
      var socket = io();
      console.log("clicked on create game ===============");
      event.preventDefault();
      socket.emit('create game request');
   });

   $(function () {

     $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
   });
     socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
   });
  });

})();