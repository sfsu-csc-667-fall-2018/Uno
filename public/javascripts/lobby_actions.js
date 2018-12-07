const socket = io.connect();

(() => {
   //socket.emit('refresh game list', {});
   updateGameList();
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

   socket.on('refresh game list response', data => {

   });

   socket.on('join game response', data => {
      if(data.result == true){
         console.log("user joined");
      }else{
         console.log("error joining user to game");
      }
      //Preston fill in here for response from server
   });

   function updateGameList() {
      let sample_games = [{gameid: 1, gamename: "poop", num_players:3}, {gameid: 2, gamename: "poop2", num_players:4}, {gameid: 3, gamename: "poop4", num_players:6}];
      let searchelement = document.getElementsByClassName("current_games");
      console.log(JSON.stringify(searchelement));
      
      for(let i in sample_games) {
         console.log('creatin game ' + sample_games[i]["gamename"]);
         let str = '<div class="col-lg-3 col-md-4 col-xs-6"><a href="/game?id=' + sample_games[i]["gameid"] + "\"";
         str += "class=\"d-block mb-4 h-100\"><img class=\"img-fluid img-thumbnail\" src=\"http://placehold.it/400x300\" alt=\"\">";
         str += "<h1>" + sample_games[i]["gamename"] + "</h1>";
         str += "<h4>players:" + sample_games[i]["num_players"] + "</h4></a></div>";
         let node = document.createElement('game' + sample_games[i]["gameid"]);
         node.innerHTML = str
         searchelement[0].appendChild(node); 
      }
   }
})();