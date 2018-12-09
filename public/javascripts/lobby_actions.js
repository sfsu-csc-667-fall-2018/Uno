// const socket = io.connect();

(() => {
   socket.emit('refresh game list', {});

   socket.on('refresh game list response', data => {
      if(data.result) {
         console.log("DATA FROM SERVER" + JSON.stringify(data.gamelist));
         updateGameList(data.gamelist);
      }
      else {
         //Preston and Chris handle not being able to get game list
         alert("COULD NOT CONNECT TO GAME SERVER");
      }
   });

   socket.on('join game response', data => {
      console.log("here")
      if(data.result == true){
         console.log("user joined");
          window.location.href = "/game?id=" + data.gameid;
      }else{
         console.log("error joining user to game");
          adddlert("Cannot join game!");
      }
      //Preston fill in here for response from server
   });

   function clickHandler(events) {
      let target_id = events.currentTarget.id
      console.log ("TARGET " + target_id);
      console.log("clicked on join game ===============");
      events.preventDefault();
      let user_info = {
         'gameid': target_id
      }
      socket.emit('join game',user_info);
   }

   function updateGameList(game_list) {
      for(let i in game_list) {
         console.log('creating game ' + game_list[i]["gamename"]);
          let str = "<div id=game" + game_list[i]["gameid"] + " class=\"col-md-5\">";

         str += "<div style=\"border: 2px solid black; width: 100%; margin: 20px; cursor: pointer\">" +
             "<center><h4>Game Name: </h4>" +
             "<h1>" + game_list[i]["gamename"] + "</h1>" +
             "<h4> Players: " + game_list[i]["num_players"] + "</h4>" +
             "</a>" +
             "</center></div>";

         let node = document.createElement('div');
         node.setAttribute("id",game_list[i]["gameid"]);
         node.innerHTML = str;
         node.onclick = clickHandler;
         document.getElementsByClassName("current_games")[0].appendChild(node); 
      }
   }
})();