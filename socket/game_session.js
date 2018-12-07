const gamelogic = require('../game_logic');

const gameSession = (io, db, name) => {
   console.log("=======================Created Game Session " + name + "=======================");

   const gamelogic = new gamelogic.UnoGameRoom(name,1);
   //get players from db

   
   socket.on('join game', data => {
      let response = {};
      socket.emit('join game response', response);
   });

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

   socket.on('get current player points' data  => {
      let response = {};
      socket.emit('get current player points response' response);
   });

   socket.on('get play', data => {
      let response = {};
      socket.emit('get play response', response);
   });

   socket.on('start game', data => {
      let response = {};
      socket.emit('start game response', response);
   });
   
}

module.exports = gameSession;