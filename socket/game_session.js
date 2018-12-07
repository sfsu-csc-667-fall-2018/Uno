const gamelogic = require('../game_logic');

const gameSession = (io, db, name) => {
   console.log("=======================Created Game Session " + name + "=======================");

   const gamelogic = new gamelogic.UnoGameRoom(name,1);
   //get players from db

   socket.on('join game',data =>{
    let cookie = socket.handshake.headers['cookie'].split(';')
    let identifier = cookie[0].slice(4,cookie[0].length-1);

    console.log("Join game: "+JSON.stringify(data));
    joinGame(data, identifier, users);
 })

   socket.on('get num players', data => {
      let response = {};
      socket.emit('get num players response', response);
   });

   socket.on('get player', data  => {
      let response = {};
      socket.emit('get player response', response);
   });

   socket.on('get player data', data  => {
      let response = {};
      socket.emit('get player data response', response);
   });

   socket.on('get play result', data  => {
      let response = {};
      socket.emit('get play result response', response);
   });

   socket.on('current discard top card', data  => {
      let response = {};
      socket.emit('current discard top card response', response);
   });

   socket.on('get other player data', data  => {
      let response = {};
      socket.emit('get other player data response', response);
   });

   socket.on('get current player points', data  => {
      let response = {};
      socket.emit('get current player points response', response);
   });

   socket.on('get play', data => {
      let response = {};
      socket.emit('get play response', response);
   });

   socket.on('start game', data => {
      let response = {};
      socket.emit('start game response', response);
   });

   //functions
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

module.exports = gameSession;