const logic = require('../game_logic');
const utilities = require('./utilities.js');
const pgp = require('pg-promise')();

const gameSession = (io, socket, db, users, games) => {
      socket.on('create game request',data =>{//to do: number of players
      console.log("Game: "+JSON.stringify(data));

      let identifier = utilities.getUserId(socket);
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
               console.log("CREATOR:" + result.username)
               games[id[0].id] = new logic.UnoGameRoom(id[0].id);
               let owner = new logic.UnoPlayer(result.username);
               games[id[0].id].addPlayer(owner);
               socket.gameID = id[0].id;
               // socket.leave('uno');
               console.log("CREATED AND JOINED GAME ID " + id[0].id);
               // socket.join(id[0].id);
               socket.emit('create game response', {result : true, 'gameid':id[0].id});
            }).catch(err => {
               console.log("Error: "+err);
               socket.emit('create game response', {result : false});
            });
         })
      }).catch(err => {
         console.log("Error: " + err);
         socket.emit('create game response', {result : false});
      });
   })



   socket.on('join game',data =>{ //input: game_id
      let response = joinGame(data, utilities.getUserId(socket), users,games);
      console.log(data)
      socket.leave('uno');
      socket.join(data.gameid);
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

   socket.on('get is it my turn', data => {
      getCurrentPlayerTurn(data, games, users, utilities.getUserId(socket));
   });

   socket.on('get player card', data  => { //input: game_id, output: player's deck
      getPlayerDeck(data, games, users, utilities.getUserId(socket))
   });

   socket.on('play card', data => {

   });

   socket.on('draw card', data => {

   });

   socket.on('get play result', data  => { //TO DO
      let response = {};
      socket.emit('get play result response', response);
   });

   socket.on('current discard top card', data  => { //input: game_id
      getDiscardTopCard(data, games);
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
      console.log(JSON.stringify(data))
      startGame(data)
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

   function startGame(data){
      let game_id = data.gameid;
      let game = games[game_id];

      game.startRound();
      insertDrawDeck(game,game_id);
      console.log("STARTING ROUND");
   }

   function insertDrawDeck(game,game_id){
      let drawdeck = game.getDrawDeckCards();
      let drawdeckwrapper = []

      for(let i = 0; i<drawdeck.length;i++){
         drawdeckwrapper.push({cardid:drawdeck[i].mapId,index: i,gameid: game_id})
      }

      const columns_drawdeck = new pgp.helpers.ColumnSet(['cardid', 'index','gameid'], {table: 'draw_decks'});
      const query_drawdeck = pgp.helpers.insert(drawdeckwrapper, columns_drawdeck);

      db.none(query_drawdeck)
       .then(data => {
         insertUsersDeck(game,game_id);
       })
       .catch(error => {
         console.log("insertDrawDeck: " +error);
         socket.emit('start game response', {result: false});
       });
   }

   function insertUsersDeck(game,game_id){
      db.any('SELECT * FROM games_users,users WHERE user_id = users.id AND game_id = ${game_id}', {
         game_id:game_id
      }).then(users =>{
         pushToUserDeck(users,game,game_id);
      }).catch(error =>{
         console.log("insertUsersDeck: " +error);
         socket.emit('start game response', {result: false});
      });
   }

   function pushToUserDeck(users,game,game_id){
      for(let user of users){
         let userdeck = game.getPlayerHands(user.username);
         let userdeckwrapper = []

         for(let i = 0; i<userdeck.length;i++){
            userdeckwrapper.push({userid:user.user_id,index: i, cardid:userdeck[i].mapId, gameid: game_id})
         }

         const columns_userdecks = new pgp.helpers.ColumnSet(['userid', 'cardid', 'gameid'], {table: 'user_decks'});
         const query_userdeck = pgp.helpers.insert(userdeckwrapper, columns_userdecks);
          db.none(query_userdeck)
          .then(data => {
            insertDiscardDeck(game,game_id)
          })
          .catch(error => {
         console.log("pushToUserDeck: " +error);
            socket.emit('start game response', {result: false});
          });
      }
   }

   function insertDiscardDeck(game,game_id){

      let discarddeck = game.getPlayedDeckCards();
      let discarddeckwrapper = []
      for(let i = 0; i<discarddeck.length;i++){
         discarddeckwrapper.push({cardid:discarddeck[i].mapId,gameid: game_id})
      }

      const columns_discarddeck = new pgp.helpers.ColumnSet(['cardid','gameid'], {table: 'discard_decks'});
      const query_discarddeck = pgp.helpers.insert(discarddeckwrapper, columns_discarddeck);

      db.none(query_discarddeck)
       .then(data => {
         setGameAsStarted(game_id);
       })
       .catch(error => {
         console.log("insertDiscardDeck: " +error);
         socket.emit('start game response', {result: false});
       });
   }

   function setGameAsStarted(game_id){
      db.none('UPDATE games SET started = true WHERE id = ${game_id}', {
         game_id: game_id
      }).catch(error => {
         console.log("setGameAsStarted: " +error);
         socket.emit('start game response', {result: false});
      })
      .then(()=>{
         io.emit('start game response', {result: true})
         //socket.broadcast.emit('start game response', {result: true})
         console.log("BROADCASTING TO GAME ID " + game_id);
         console.log("SOCKET ROOMS " + socket.gameID);
         // io.to(game_id).emit('start game response', {result: true});
         //socket.emit('start game response', {result: true})
      })
   }

   function getDiscardTopCard(data, games){
      let game_id = data.gameid;
      let topcard = games[game_id].getCurrentTopCardAttributes();

      db.one('SELECT * FROM discard_decks,all_cards WHERE cardid = all_cards.id AND gameid = ${gameid} ORDER BY discard_decks.id DESC LIMIT 1', {
         gameid:game_id
      }).then(card =>{
         if(topcard.TYPE === card.type && topcard.COLOR === card.color){
            socket.emit('current discard top card response', {result:true, currentTopCard : card});
         }else{
            console.log("Game logic and DB are not synced");
            socket.emit('current discard top card response', {result:false});
         }
      }).catch(error =>{
         console.log(error);
         socket.emit('current discard top card response', {result:false});
      });


      /*if(typeof topcard === "undefined") {
         socket.emit('current discard top card response', {result:false});
      } else {
         socket.emit('current discard top card response', {result:true, currentTopCard : topcard});
      }*/
   }

   function getPlayerDeck(data, games, users, identifier){
      let game_id = data.gameid;
      let cardsFromGame = games[game_id].getPlayerHands(users[identifier].username);

      db.any('SELECT number,color,type,image,all_cards.id FROM user_decks,all_cards WHERE cardid = all_cards.id AND gameid = ${gameid} AND userid = ${userid} ORDER BY all_cards.id ASC', {
         gameid:game_id,
         userid:users[identifier].id
      }).then(card =>{
         console.log("USER DECK DB ============= "+ JSON.stringify(card));
         console.log("USER DECK GL ============= "+ JSON.stringify(cardsFromGame.sort(logic.UnoCard.cardSortCriteriaWithMap)));

         if(card.length === cardsFromGame.length){
            for(let i = 0; i<card.length;i++){
               if(card[i].type !== cardsFromGame[i].typeOfCard || card[i].color !== cardsFromGame[i].colorOfCard){
                  console.log("Game logic and DB are not synced");
                  socket.emit('get player card response', {result:false});
               }
            }
            socket.emit('get player card response', {result:true, cardsToSend : card});
         }else{
            console.log("Game logic and DB are not synced");
            socket.emit('get player card response', {result:false});
         }
         /*if(cardsFromGame.TYPE === card.type && cardsFromGame.COLOR === card.color){
            socket.emit('current discard top card response', {result:true, currentTopCard : card});
         }else{
            console.log("Game logic and DB are not synced");
            socket.emit('current discard top card response', {result:false});
         }*/
      }).catch(error =>{
         console.log(error);
         socket.emit('get player card response', {result:false});
      });



      /*console.log("Getting cards for user " + users[identifier].username);
      if(typeof cardsFromGame === "undefined") {
         socket.emit('get player card response', {result:false});
      } else {
         socket.emit('get player card response', {result:true, cardsToSend : cardsFromGame});
      }*/
   }

   function getCurrentPlayerTurn(data, games, users, identifier) {
      let game_id = data.gameid;
      let username = users[identifier].username;
      let currPlayer = games[game_id].getCurrentPlayer();
      if(typeof currPlayer === "undefined") {
         socket.emit('get is it my turn response', {result : false});
      }
      else if(currPlayer.name === username) {
         socket.emit('get is it my turn response', {result : true, myTurn : true});
      }
      else {
         socket.emit('get is it my turn response', {result : true, myTurn : false});
      }
   }

   function drawCard(data, games, users, identifier) {
      let username = users[identifier];
      let game_id = data.gameid;
      let curr_game = games[game_id];
      let currPlayer = curr_game.getCurrentPlayer();
      if(username !== currPlayer.name) {
         socket.emit('draw card response', {result : false, message : "USER PLAYING DOES NOT MATCH USER IN GAME"});
      }
      else {
         let moveResult = curr_game.currentPlayerDrewACard();
         socket.emit('draw card response', {result : moveResult});
         if(moveResult) {
            let cardsFromGame = games[game_id].getPlayerHands(users[identifier].username);
            socket.emit('get player card response', {result:true, cardsToSend : cardsFromGame});
            curr_game.updatePlayerPosition();
         }
      }
   }

   function playACard(data, games, users, identifier) {
      let username = users[identifier];
      let game_id = data.gameid;
      let card_index = data.cardIndex;
      let curr_game = games[game_id];
      let currPlayer = curr_game.getCurrentPlayer();
      if(username !== currPlayer.name) {
         socket.emit('play card response', {result : false, message : "USER PLAYING DOES NOT MATCH USER IN GAME"});
      }
      else {
         let status = curr_game.currentPlayerPlayedACard(cardIndex);
         socket.emit('play card response', {result : status});

         //Update the current top card message to client
         let curr_top_card = curr_game.getCurrentTopCardAttributes();
         socket.emit('current discard top card response', {result : status,  currentTopCard : curr_top_card});
         curr_game.updatePlayerPosition();
      }
   }
}

module.exports = gameSession;