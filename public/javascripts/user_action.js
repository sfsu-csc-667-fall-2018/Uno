const socket = io.connect();

(() => {

   $('#login-form').on('submit', event => {
      console.log("clicked on login ===============");
      event.preventDefault();
      socket.emit('login','login');
   });

   socket.on('login response', data => {
      console.log("I got a response from server");
   });

   socket.on('registration response', data => {

   });


   socket.on('update name', data => {});
   socket.on('update email', data => {});

})();