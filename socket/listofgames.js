const utilities = require('./utilities.js');
const logic = require('../game_logic');

const listofgames = (io, socket, db, games,users) => {
   socket.on('refresh game list',data =>{
      if(users[utilities.getUserId(socket)] == undefined){//user is not registered
         console.log("USER HAS NOT LOGGED IN")
         socket.emit('refresh game list response', {'result':true, 'loggedIn':false});
      }else{
         db.any('SELECT (id,name,number_players) FROM games')
         .then(games =>{
            let game_list = [];
            for(let row_id in games) {
               let temp = {};
               let attr = games[row_id]["row"].replace('(', '').replace(')', '').split(',');
               temp["gameid"] = attr[0];
               temp["gamename"] = attr[1];
               temp["num_players"] = attr[2];
               game_list.push(temp);
            }
            //console.log("GAME LIST " + JSON.stringify(game_list));
            socket.emit('refresh game list response', {'result':true, 'gamelist': game_list});
         })
         .catch(err => {
            console.log("Error: "+err);
            socket.emit('refresh game list response', {'result':false});
         });
      }
   });

   socket.on('game exists', data =>{
      if(games.hasOwnProperty(data.gameid)) {
         socket.emit('game exists response', {result : true, gameid : data.gameid});
      }
      else {
         socket.emit('game exists response', {result : false});
      }
   });
}

module.exports = listofgames;