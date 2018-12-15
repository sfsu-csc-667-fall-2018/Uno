const logic = require('../game_logic');
const utilities = require('./utilities.js');
const pgp = require('pg-promise')();
const gamesDB = require('../db/games.js');

const gameSession = (io, socket, db, users, games) => {
   socket.leave('uno');

   socket.on('create game request',async data =>{//to do: number of players
      let identifier = utilities.getUserId(socket);
      await gamesDB.insertInGame(data.name, data.number, users[identifier].id)
      .then(result =>{
         games[result.id] = new logic.UnoGameRoom(result.id);
         socket.emit('create game response', {result : true, 'gameid':result.id});
      })
      .catch(err => {
         console.log("Error: " + err);
         socket.emit('create game response', {result : false});
      });
   })

    socket.on('join game',async data =>{ //input: game_id
      let game_id = data.gameid;
      let identifier = utilities.getUserId(socket);
      socket.leave('uno');
      socket.join(game_id);
      let rooms = Object.keys(socket.rooms);
      let hasJoined = games[game_id].doesPlayerExistInGame(users[identifier].username);
      await gamesDB.checkIfGameHasStarted(game_id)
      .then(async (result)=>{
         console.log("GAME HAS STARTED:"+result.started)
         if(result.started == true && hasJoined == false){
            console.log("User is trying to join a game that has already started");
            socket.emit('join game response', {result:false,alreadyJoined:false,alreadyStarted:true,gameid:game_id});
         }else if(result.started == false && hasJoined == false) { //user has not joined already
            await gamesDB.InsertInGameUsers(data, identifier, users,games)
            .then(()=>{
               console.log("User: "+users[identifier].username+" Joins for the first time")
               let player = new logic.UnoPlayer(users[identifier].username);
               games[game_id].addPlayer(player);
               socket.emit('join game response', {result:true,alreadyJoined:false,alreadyStarted:false,gameid:game_id});
            })
            .catch(error => {
               console.log("join game: "+error)
               socket.emit('join game response', {result:false,alreadyJoined:false,alreadyStarted:false});
            });
         }else if(result.started == true && hasJoined == true){//user has already joined before
            console.log("User: "+users[identifier].username+" Re-Joins the game")
            socket.emit('join game response', {result:true,alreadyJoined:true,alreadyStarted:false, gameid:game_id});
         }
      })
      .catch(error => {
         console.log("join game: "+error)
         socket.emit('join game response', {result:false,alreadyJoined:false,alreadyStarted:false});
      });
   })

   socket.on('get num players', async data => { //input: game_id
      getNumberOfPlayers(data);
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
      console.log("DATA ====="+data.gameid)
      getPlayerDeck(data, games, users, utilities.getUserId(socket))
   });

   socket.on('play card', data => {
      playACard(data, games, users, utilities.getUserId(socket));
   });

   socket.on('draw card', data => {
      console.log("PLAYER DRAW A CARD in GAME " + data.gameid);
      drawCard(data, games, users, utilities.getUserId(socket));
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

   socket.on('start game',async data => { //input: game_id
      console.log(JSON.stringify(data));
      await startGame(data);
   });

   socket.on('get players state', data => { //TO DO
      let g_id = data.gameid;
      let curr_game = games[g_id];
      let names = [];
      for(let p of curr_game.getPlayers()) {
         names.push(p.name);
      }

      let response = {result : true, players_names : names, currentPlayerIndex : curr_game.getCurrentPlayerIndex()};
      console.log("RETRIEVING PLAYERS STATE");
      socket.emit('get players state response', response);
   });

   //---------------CHAT SECTION-----------------
   socket.on('chat message game', (message) => {
      let name = users[utilities.getUserId(socket)].username;
      console.log("NEW MESSAGE"+JSON.stringify(message));
      io.to(message.gameid).emit('chat message game', {username: name ,message : message.message});
   })

   //functions

   async function getNumberOfPlayers(data){
      let game_id = data.gameid;

      await gamesDB.getCountOfPlayers(game_id)
      .then(result =>{
         socket.emit('get num players response', result);
      })
      .catch(err => {
         return {'result':false};
         socket.emit('get num players response', {'result':false});
      });
   }

   async function startGame(data){
      console.log("================ NEW START GAME =================");
      let game_id = data.gameid;
      let game = games[game_id];
      game.startRound();

      await gamesDB.insertInDrawDeck(game,game_id)
      .then(()=>{
      })
      .catch( error => {
         console.log("insertDrawDeck: " +error);
         socket.emit('start game response', {result: false});
         return;
      });

      await updateUserDeck(game_id,game,)
      .then((result) => {

      })
      .catch(error =>{
         console.log("pushToUserDeck: " +error);
         socket.emit('start game response', {result: false});
      });

      await gamesDB.insertInDiscardDeck(game,game_id)
      .then(data => {})
      .catch(error => {
         console.log("insertDiscardDeck: " +error);
         socket.emit('start game response', {result: false});
      });

      await gamesDB.setGameAsStarted(game_id)
      .then(()=>{
         //io.emit('start game response', {result: true})
         //socket.broadcast.emit('start game response', {result: true})
         console.log("BROADCASTING TO GAME ID " + game_id);
         console.log("SOCKET ROOMS " + socket.gameID);
         let rooms = Object.keys(socket.rooms);
         console.log("ROOMS in start response ==== " + rooms);
         io.in(game_id).emit('start game response', {result: true});
         //socket.emit('start game response', {result: true})
      })
      .catch(error => {
         console.log("setGameAsStarted: " +error);
         io.in(game_id).emit('start game response', {result: false});
       });

      console.log("STARTING ROUND");
   }

   async function updateUserDeck(game_id,game){
      await gamesDB.getFromUsersDeck(game_id,game)
      .then((result) => {
         let promises = [];
         for(let user of result){
            let userdeck = game.getPlayerHands(user.username);
            let userdeckwrapper = [];

            for(let i = 0; i<userdeck.length;i++){
               userdeckwrapper.push({userid:user.user_id,index: i, cardid:userdeck[i].mapId, gameid: game_id})
            }

            const columns_userdecks = new pgp.helpers.ColumnSet(['userid', 'cardid', 'gameid'], {table: 'user_decks'});
            const query_userdeck = pgp.helpers.insert(userdeckwrapper, columns_userdecks);

            promises.push(gamesDB.pushToUserDeck(query_userdeck,game_id,user.user_id));
         }

         return Promise.all(promises);

      })
      .catch(error =>{
         console.log("getUsersDeck: " +error);
         socket.emit('start game response', {result: false});
         return;
      });
   }

   function updateSingleUserDeck(game_id,game,user){

      let userdeck = game.getPlayerHands(user.username);
      let userdeckwrapper = [];

      for(let i = 0; i<userdeck.length;i++){
         userdeckwrapper.push({userid:user.id,index: i, cardid:userdeck[i].mapId, gameid: game_id})
      }

      const columns_userdecks = new pgp.helpers.ColumnSet(['userid', 'cardid', 'gameid'], {table: 'user_decks'});
      const query_userdeck = pgp.helpers.insert(userdeckwrapper, columns_userdecks);

      return gamesDB.pushToUserDeck(query_userdeck,game_id,user.id);
   }

   function getDiscardTopCard(data, games){
      let game_id = data.gameid;
      let topcard = games[game_id].getCurrentTopCardAttributes();

      gamesDB.getFromDiscardDeck(game_id)
      .then(card =>{
         console.log("DB TOP CARD:"+JSON.stringify(card))
         console.log("GL TOP CARD:"+JSON.stringify(topcard))
         if(topcard.TYPE === card.type && topcard.COLOR === card.color){
            io.in(game_id).emit('current discard top card response', {result:true, currentTopCard : card});
         }else{
            console.log("Discard Pile Top Card Game logic and DB are not synced");
            io.in(game_id).emit('current discard top card response', {result:false});
         }
      }).catch(error =>{
         console.log(error);
         io.in(game_id).emit('current discard top card response', {result:false});
      });
   }

   async function getPlayerDeck(data, games, users, identifier){
      let game_id = data.gameid;
      let cardsFromGame = games[game_id].getPlayerHands(users[identifier].username);
      cardsFromGame.sort(logic.UnoCard.cardSortCriteriaWithMap);
      await gamesDB.getFromPlayerDeck(game_id,users[identifier].id)
      .then(card =>{
         //console.log("USER DECK DB ============= "+ JSON.stringify(card));
         // console.log("USER DECK GL ============= "+ JSON.stringify(cardsFromGame));

         if(card.length === cardsFromGame.length){
            for(let i = 0; i<card.length;i++){
               if(card[i].type !== cardsFromGame[i].typeOfCard || card[i].color !== cardsFromGame[i].colorOfCard){
                  console.log("Player Hand Game logic and DB are not synced");
                  socket.emit('get player card response', {result:false});
               }
            }
            socket.emit('get player card response', {result:true, cardsToSend : card});
         }else{
            console.log("Game logic and DB are not synced");
            socket.emit('get player card response', {result:false});
         }
      })
      .catch(error =>{
         console.log(error);
         socket.emit('get player card response', {result:false});
      });
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

   function updatePlayerHandsHelper(data, games, game_id, users, identifier) {
      let cardsFromGame = games[game_id].getPlayerHands(users[identifier].username);
      cardsFromGame.sort(logic.UnoCard.cardSortCriteriaWithMap);
      updateSingleUserDeck(game_id, games[game_id], users[identifier])
      .then(()=>{
         getPlayerDeck(data, games, users, utilities.getUserId(socket));
      })
      .catch((error)=>{
         console.log(error);
      })
   }

   async function drawCard(data, games, users, identifier) {
      let username = users[identifier].username;
      let game_id = data.gameid;
      let curr_game = games[game_id];
      let currPlayer = curr_game.getCurrentPlayer();
      console.log(JSON.stringify(username) + " Drawing a Card");
      console.log("from client " + username + " game logic " + currPlayer.name);
      if(username !== currPlayer.name) {
         socket.emit('draw card response', {result : false, message : "USER PLAYING DOES NOT MATCH USER IN GAME"});
      }
      else {
         let moveResult = curr_game.currentPlayerDrewACard();
         io.in(game_id).emit('draw card response', {result : moveResult});
         if(moveResult) {
            updatePlayerHandsHelper(data, games, game_id, users, identifier);
            games[game_id].updatePlayerPosition();
         }
      }
   }

   async function playACard(data, games, users, identifier) {
      let username = users[identifier].username;
      let game_id = data.gameid;
      let card_index = data.cardIndex;
      let curr_game = games[game_id];
      let currPlayer = curr_game.getCurrentPlayer();
      console.log("from client " + username + " game logic " + currPlayer.name);
      if(username !== currPlayer.name) {
         socket.emit('play card response', {result : false, message : "USER PLAYING DOES NOT MATCH USER IN GAME"});
      }
      else {
         console.log("Checking the move validity");
         let status = curr_game.currentPlayerPlayedACard(card_index);
         console.log("MOVE RESULT " + status);
         //Update the current top card message to client
         if(status) {
            let curr_top_card = curr_game.getCurrentTopCardAttributes();
            let move_result = curr_game.getLastMoveResult();
            await gamesDB.insertInDiscardDeck(curr_game,game_id)
            .then(()=>{
               getDiscardTopCard(data, games);
               updatePlayerHandsHelper(data, games, game_id, users, identifier);
               games[game_id].updatePlayerPosition();
               socket.emit('play card response', {result : status});
            })
            .catch((error)=>{
               console.log("play a card:"+error);
            })
         }
         else {
            socket.emit('play card response', {result : status, message : "ILLEGAL MOVE"});
         }
      }
   }
}

module.exports = gameSession;




