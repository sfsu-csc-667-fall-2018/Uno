
const user_events = (io, socket, db, users) => {

  socket.on('join game',data =>{
    let cookie = socket.handshake.headers['cookie'].split(';')
    let identifier = cookie[0].slice(4,cookie[0].length-1);

    console.log("Join game: "+JSON.stringify(data));
    joinGame(data, identifier, users);
  })

  function joinGame(data, identifier,users){
    console.log("============USERS: "+JSON.stringify(users));
    let game_id = data.gameid;
    let user_id = users[identifier].id;

    db.none('INSERT INTO games_users(user_id, game_id) VALUES(${user_id}, ${game_id})', {
     user_id: user_id,
     game_id: game_id
   })
    .catch(err => {
      socket.emit('join game response', {'result':false});
    });

    socket.emit('join game response', {'result':true});
  }
}

module.exports = user_events;

