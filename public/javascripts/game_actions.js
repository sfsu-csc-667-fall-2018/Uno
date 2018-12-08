const socket = io.connect();

(() => {

   $('#start-game').on('click', event => {
      console.log("clicked on start game ==============="+document.URL);
      let game_id = document.URL.splice(document.URL.indexOf("=")+1);
      event.preventDefault();
      let user_info = {
         'gameid':game_id,
      }
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


    //Preston and Chris these are the calls to the server
    //We need to wrap these in to functions
    //I left some examples up above
    // socket.emit('get num players', data);
    // socket.emit('get player', data);
    // socket.emit('get player data', data);
    // socket.emit('get play result', data);
    // socket.emit('current discard top card', data);
    // socket.emit('get other player data', data);
    // socket.emit('get current player points' data);
    // socket.emit('get play', data);




    //These functions are the call backs that the
    //Server will call
    socket.on('get num players response', data => {
      //Preston and Chris fill in here
    });

    socket.on('get player response', data => {
      //Preston and Chris fill in here
    });

    socket.on('get player data response', data => {
      //Preston and Chris fill in here
    });

    socket.on('get play result response', data => {
      //Preston and Chris fill in here
    });

    socket.on('current discard top card response', data => {
      //Preston and Chris fill in here
    });

    socket.on('get other player data response', data => {
      //Preston and Chris fill in here
    });

    socket.on('get current player points response', data => {
      //Preston and Chris fill in here
    });

    socket.on('get play response', data => {
      //Preston and Chris fill in here
    });


})();