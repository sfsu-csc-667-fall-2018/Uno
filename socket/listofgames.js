const listofgames = (io, socket, db, games,users) => {

   socket.on('create game request',data =>{//to do: number of players
      console.log("Game: "+JSON.stringify(data));
      db.any('INSERT INTO games(name) VALUES(${name}) RETURNING id', {
         name: data.name
      }).then(id =>{
         console.log(JSON.stringify(users));
         console.log("========"+JSON.stringify(socket));
         db.any('INSERT INTO games_users(user_id,game_id) VALUES(${userid},${gameid}) RETURNING id', {
            userid: users[socket.id].id,
            gameid: id[0]['id']
         })
      }).catch(err => {
         console.log("Error: "+err);
      });
   })
}

module.exports = listofgames;