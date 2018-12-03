(() => {

   $('#create-game').on('submit', event => {
      var socket = io();
      console.log("clicked on create game ===============");
      event.preventDefault();
      socket.emit('create game request','hello from client');
   });


   socket.on('create game response', data => {

   });

   socket.on('join game response', data => {

   });

})();