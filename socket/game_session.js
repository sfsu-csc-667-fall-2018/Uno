const logic = require('../game_logic');
const utilities = require('./utilities.js');

const gameSession = (io, socket, db, users, games) => {

   //const gamelogic = new gamelogic.UnoGameRoom("name",1);

   socket.on('join game',data =>{ //input: game_id
      let response = joinGame(data, utilities.getUserId(socket), users,games);
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

   function joinGame(data, identifier, users, games){
      console.log("PRINTING OUT " + JSON.stringify(users));
      console.log("identifier " + identifier);
      console.log("PRINTING OUT " + JSON.stringify(users[identifier]));
      console.log("PRINTING OUT " + users[identifier]);
      let game_id = data.gameid;
      let user_id = users[identifier].id;

      db.none('INSERT INTO games_users(user_id, game_id) VALUES(${user_id}, ${game_id})', {
         user_id: user_id,
         game_id: game_id
      })
      .catch(err => {
         return {'result':false};
      });
      console.log("game_id"+game_id)
      let player = new logic.UnoPlayer(users[identifier].username);
      games[game_id].addPlayer(player);
      return {'result':true,"gameid":game_id};
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

      let game = games[game_id];
      game.startRound();

      let drawdeck = game.getDrawDeckCards();

      const columns_drawdeck = new pgp.helpers.ColumnSet(['cardid', 'index'], {table: 'draw_decks'});
      //const columns_userdecks = new pgp.helpers.ColumnSet(['userid', 'cardid'], {table: 'user_decks'});

      const query_drawdeck = pgp.helpers.insert(values, columns_drawdeck);
      //const query_userdeck = pgp.helpers.insert(values, columns_userdecks);

      db.none(query_drawdeck)
       .then(data => {
           // success;
       })
       .catch(error => {
           // error;
       });

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

}

module.exports = gameSession;