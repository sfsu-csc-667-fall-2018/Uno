const socket = io.connect();

(() => {
   $('#login-submit').on('click', event => {
      console.log("clicked on login ===============");
      event.preventDefault();
      let user_info = {
         'username':$('#login-username').val(),
         'password':$('#login-password').val()}
         socket.emit('login',user_info);
      });

   $('#register-submit').on('click', event => {
      console.log("clicked on register ===============");
      event.preventDefault();
      let user_info = {
         'username':$('#register-username').val(),
         'email':$('#register-email').val(),
         'password':$('#register-password').val(),}
         socket.emit('register',user_info);
      });

   //Preston and Chris we need to wrap these guys
   //In corresponding functions above
   // socket.emit('update name', data);
   // socket.emit('update email', data);
   // socket.emit('update password', data);

   //Server response callbacks
   socket.on('login response', data => {
      console.log("Result of login "+data.result);
      if(data.result == true){
         window.location.replace('/lobby');
      }else{
         alert('invalid credentials')
      }
   });

   socket.on('registration response', data => {
      console.log("Result of registration "+data.result);
      if(data.result == true){
         window.location.replace('/lobby');
      }else{
         alert('invalid credentials')
      }
   });

   socket.on('update name response', data => {
      //Preston and Chris fill in here
   });

   socket.on('update email response', data => {
      //Preston and Chris fill in here
   });

   socket.on('update password response', data => {
      //Preston and Chris fill in here
   });

})();