const gamelogic = require('../game_logic');

const gameSession = (io, socket, db, users) => {

   //const gamelogic = new gamelogic.UnoGameRoom(name,1);

   socket.on('join game',data =>{ //input: game_id
      let response = joinGame(data, getUserId(), users);
      console.log(data)
      socket.emit('join game response', response);
   })

   socket.on('get num players', data => { //input: game_id
      let response = getNumberOfPlayers(data);
      socket.emit('get num players response', response);
   });

   socket.on('get player', data  => { //TO DO
      let response = {};
      socket.emit('get player response', response);
   });

   socket.on('get player data', data  => { //input: game_id, output: player's deck
      let response = getPlayerDeck(data);
      socket.emit('get player data response', response);
   });

   socket.on('get play result', data  => { //TO DO
      let response = {};
      socket.emit('get play result response', response);
   });

   socket.on('current discard top card', data  => { //input: game_id
      let response = getDiscardTopCard(data);
      socket.emit('current discard top card response', response);
   });

   socket.on('get other player data', data  => { //TO DO
      let response = {};
      socket.emit('get other player data response', response);
   });

   socket.on('get current player points', data  => { //TO DO
      let response = {};
      socket.emit('get current player points response', response);
   });

   socket.on('get play', data => { //TO DO
      let response = {};
      socket.emit('get play response', response);
   });

   socket.on('start game', data => { //input: game_id
      let response = startGame(data);
      socket.emit('start game response', response);
   });

   //functions

   function joinGame(data, identifier, users){
      let game_id = data.gameid;
      let user_id = users[identifier].id;

      db.none('INSERT INTO games_users(user_id, game_id) VALUES(${user_id}, ${game_id})', {
         user_id: user_id,
         game_id: game_id
      }).catch(err => {
         return {'result':false};
      });
      return {'result':true};
   }

   function getNumberOfPlayers(data){
      let game_id = data.gameid;

      db.one('SELECT COUNT(*) FROM games_users WHERE game_id = ${game_id})', {
         game_id: game_id
      }).catch(err => {
         return {'result':false};
      });
      return {'result':true};
   }

   function getDiscardTopCard(data){
      let game_id = data.gameid;

      db.one('SELECT cardid FROM discard_decks WHERE game_id = ${game_id})', {
         game_id: game_id
      })
      .then(cardid => {
         db.one('SELECT * FROM all_cards WHERE id = ${cardid})', {
            cardid: cardid
         })
         .then(card => {
            return {'result':true, card};
         });
      })
      .catch(err => {
         return {'result':false};
      });
   }

   function startGame(data){
      let game_id = data.gameid;

      db.none('UPDATE games SET started = true WHERE id = ${game_id})', {
         game_id: game_id
      }).catch(err => {
         return {'result':false};
      });
      return {'result':true};
   }

   function getPlayerDeck(data){
      let game_id = data.gameid;

      db.any('SELECT * FROM user_decks,all_cards WHERE user_decks.gameid = ${game_id} AND cardid = all_cards.id)', {
         game_id: game_id
      })
      .then(cards => {
         return {'result':true, cards};
      })
      .catch(err => {
         return {'result':false};
      });
   }

   function getUserId(){
      let cookie = socket.handshake.headers['cookie'].split(';')
      return cookie[0].slice(4,cookie[0].length-1);
   }

}

module.exports = gameSession;