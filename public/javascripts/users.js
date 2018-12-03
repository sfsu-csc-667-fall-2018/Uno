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

})();