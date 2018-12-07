const socket = io.connect();

(() => {
   socket.emit('refresh game list', {});

   socket.on('refresh game list response', data => {
      if(data.result) {
         updateGameList(data.game_list);
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
          window.location.href = "game" + data.gameid;
      }else{
         console.log("error joining user to game");
          adddlert("Cannot join game!");
      }
      //Preston fill in here for response from server
   });

   function clickHandler(events) {
      console.log("IM BEING HANDLED");
      console.log ("TARGET " + event.currentTarget.id);
      console.log("clicked on join game ===============");
      event.preventDefault();
      let user_info = {
         'gameid': event.currentTarget.id
      }
      socket.emit('join game',user_info);
   }

   function updateGameList(game_list) {
      for(let i in game_list) {
         console.log('creatin game ' + game_list[i]["gamename"]);
         let str = "<div id=game" + game_list[i]["gameid"] + " class=\"col-lg-3 col-md-4 col-xs-6\">";//<a 
         str += "<div class=\"d-block mb-4 h-100\"><img class=\"img-fluid img-thumbnail\" src=\"http://placehold.it/400x300\" alt=\"\">";
         str += "<h1>" + game_list[i]["gamename"] + "</h1>";
         str += "<h4>players:" + game_list[i]["num_players"] + "</h4></a></div>";

         let node = document.createElement('div');
         node.setAttribute("id",game_list[i]["gameid"]);
         node.innerHTML = str;
         node.onclick = clickHandler;
         document.getElementsByClassName("current_games")[0].appendChild(node); 
      }
   }
})();