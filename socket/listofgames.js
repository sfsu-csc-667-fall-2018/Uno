const utilities = require('./utilities.js');
const logic = require('../game_logic');

const listofgames = (io, socket, db, games,users) => {

   socket.on('create game request',data =>{//to do: number of players
      console.log("Game: "+JSON.stringify(data));

      let identifier = utilities.getUserId(socket);
      console.log("FROM COOKIE Identifier: "+identifier);
      console.log("USERS BABY: "+ JSON.stringify(users));
      db.any('INSERT INTO games(name,number_Players,owner_id) VALUES(${name},${numberPlayers},${owner_id}) RETURNING id', {
         name: data.name,
         numberPlayers: data.number,
         owner_id: users[identifier].id
      }).then(id =>{
         db.one('INSERT INTO games_users(user_id,game_id) VALUES(${userid},${gameid}) RETURNING game_id', {
            userid: users[identifier].id,
            gameid: id[0]['id'],
         }).then(gameid =>{
            db.one('SELECT username FROM users WHERE id = ${userid}',{
               userid: users[identifier].id
            }).then(result =>{
               console.log("CREATOR:"+result.username)
               games[id[0].id] = new logic.UnoGameRoom(id[0].id);
               let owner = new logic.UnoPlayer(result.username);
               games[id[0].id].addPlayer(owner);
               socket.emit('create game response', {result : true, 'gameid':id[0].id});
            }).catch(err => {
               console.log("Error: "+err);
               socket.emit('create game response', {result : false});
            });
         })
      }).catch(err => {
         console.log("Error: "+err);
         socket.emit('create game response', {result : false});
      });
   })

   socket.on('refresh game list',data =>{
      db.any('SELECT (id,name,number_players) FROM games')
      .then(games =>{
         let game_list = [];
         console.log("IN DATABASE  " + typeof games);
         for(let row_id in games) {
            let temp = {};
            console.log("GAME OBJECT " + typeof games[row_id]["row"]);
            let attr = games[row_id]["row"].replace('(', '').replace(')', '').split(',');
            temp["gameid"] = attr[0];
            temp["gamename"] = attr[1];
            temp["num_players"] = attr[2];
            console.log("GAMES " + JSON.stringify(temp));
            game_list.push(temp);
         }
         //console.log("GAME LIST " + JSON.stringify(game_list));
         socket.emit('refresh game list response', {'result':true, 'gamelist': game_list});
      })
      .catch(err => {
         console.log("Error: "+err);
         socket.emit('refresh game list response', {'result':false});
      });
   });
}

module.exports = listofgames;