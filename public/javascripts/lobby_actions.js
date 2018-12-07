const socket = io.connect();

(() => {

   $('#join-game').on('click', event => {
      console.log("clicked on join game ===============");
      event.preventDefault();
      let user_info = {
         'gameid':3
      }
      socket.emit('join game',user_info);

      console.log("after clicked on join game ===============");
   });

   // function joinGame(){
   //    console.log("clicked on join game ===============");
   //    event.preventDefault();
   //    let user_info = {
   //       'gameid':3
   //    }
   //    socket.emit('join game',user_info);
   // }

   socket.on('join game response', data => {
      if(data.result == true){
         console.log("user joined");
      }else{
         console.log("error joining user to game");
      }
      //Preston fill in here for response from server
   });
})();