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


   socket.on('update name', data => {});
   socket.on('update email', data => {});

})();