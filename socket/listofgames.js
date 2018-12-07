const listofgames = (io, socket, db, games,users) => {

   socket.on('create game request',data =>{//to do: number of players
      console.log("Game: "+JSON.stringify(data));
      let cookie = socket.handshake.headers['cookie'].split(';')
      let identifier = cookie[0].slice(4,cookie[0].length-1);
      console.log("Identifier: "+identifier);
      db.any('INSERT INTO games(name,number_Players,owner_id) VALUES(${name},${numberPlayers},${owner_id}) RETURNING id', {
         name: data.name,
         numberPlayers: data.number,
         owner_id: users[identifier].id
      }).then(id =>{
         console.log(JSON.stringify(users));
         db.any('INSERT INTO games_users(user_id,game_id) VALUES(${userid},${gameid}) RETURNING id', {
            userid: users[identifier].id,
            gameid: id[0]['id'],
         })
      }).catch(err => {
         console.log("Error: "+err);
      });
   })

   socket.on('refresh game list',data =>{
      db.any('SELECT (id,name,number_players) FROM games')
      .then(games =>{
         socket.emit('refresh game list response', {'result':true, games});
      })
      .catch(err => {
         console.log("Error: "+err);
         socket.emit('refresh game list response', {'result':false});
      });
   }
}

module.exports = listofgames;