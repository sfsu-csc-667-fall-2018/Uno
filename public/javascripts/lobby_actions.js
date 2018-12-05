const socket = io.connect();

(() => {

   $('#login-submit').on('click', event => {
      console.log("clicked on login ===============");
      event.preventDefault();
      let user_info = {
         'username':$('#login-username').val(),
         'password':$('#login-password').val()}
         socket.emit('join game',user_info);
      });



   socket.on('join game response', data => {
      //Preston fill in here for response from server
   });
})();