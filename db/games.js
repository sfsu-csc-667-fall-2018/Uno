const db = require('./index');
const pgp = require('pg-promise')();
const logic = require('../game_logic');


const Games ={

   async insertInGame(name,numberPlayers,ownerId){
      return db.one('INSERT INTO games(name,number_Players,owner_id) VALUES(${name},${numberPlayers},${owner_id}) RETURNING id', {
         name: name,
         numberPlayers: numberPlayers,
         owner_id: ownerId
      })
   },

   async checkGameStatus(game_id){
      return db.one('Select started,number_players,owner_id FROM games WHERE id = ${game_id}', {
         game_id:game_id
      })
   },

   async InsertInGameUsers(data, identifier, users, games){
      console.log("======== CALL TO JOIN GAME ============");
      let game_id = data.gameid;
      let user_id = users[identifier].id;

      return db.none('INSERT INTO games_users(user_id, game_id) VALUES(${user_id}, ${game_id})', {
         user_id: user_id,
         game_id: game_id
      })
   },

   async insertInDrawDeck(game,game_id){
      console.log("====== INSERT DRAW DECK CALL =========");
      let drawdeck = game.getDrawDeckCards();
      let drawdeckwrapper = []

      for(let i = 0; i<drawdeck.length;i++){
         drawdeckwrapper.push({cardid:drawdeck[i].mapId,index: i,gameid: game_id})
      }

      const columns_drawdeck = new pgp.helpers.ColumnSet(['cardid', 'index','gameid'], {table: 'draw_decks'});
      const query_drawdeck = pgp.helpers.insert(drawdeckwrapper, columns_drawdeck);

      return db.none(query_drawdeck)
   },

   async removeFromDrawDeck(game,game_id){
      return db.none("DELETE FROM draw_decks WHERE gameid = ${game_id} AND index = any (array(SELECT index FROM draw_decks WHERE gameid = ${game_id} ORDER BY index DESC LIMIT 1))",{
         game_id: game_id
      })
   },

   async getFromUsersDeck(game_id,game){
      console.log("====== GET USERS DECK CALL =========");
      return db.any('SELECT * FROM games_users,users WHERE user_id = users.id AND game_id = ${game_id}', {
         game_id:game_id
      })
   },

   async pushToUserDeck(query_userdeck,game_id,user_id){
      console.log("Deleting cards for user:"+user_id)
      await db.none("DELETE FROM user_decks WHERE gameid = ${gameid} AND userid = ${userid}", {
         gameid: game_id,
         userid: user_id
      })
      .then(()=>{
         console.log("====== PUSH TO USER DECK CALL =========");
         return db.none(query_userdeck)
      })
      .catch((error)=>{
         console.log("Pushing to user deck:"+error);
      });
   },

   async insertInDiscardDeck(game,game_id){
      let discarddeck = game.getCurrentTopCardAttributes();
      console.log("TOP CARG GL::::::"+discarddeck.MAPID)
      return db.none("INSERT INTO discard_decks(cardid, gameid) values (${card_id},${game_id})",{
         game_id: game_id,
         card_id: discarddeck.MAPID
      })
   },

   async setGameAsStarted(game_id){
      return db.none('UPDATE games SET started = true WHERE id = ${game_id}', {
         game_id: game_id
      })
   },

   async getFromDiscardDeck(game_id){
      return db.one('SELECT * FROM discard_decks,all_cards WHERE cardid = all_cards.id AND gameid = ${gameid} ORDER BY discard_decks.id DESC LIMIT 1', {
         gameid:game_id
      })
   },

   async getFromPlayerDeck(game_id,user_id){
      return db.any('SELECT number,color,type,image,all_cards.id FROM user_decks,all_cards WHERE cardid = all_cards.id AND gameid = ${gameid} AND userid = ${userid} ORDER BY all_cards.id ASC', {
         gameid:game_id,
         userid:user_id
      })
   },

   async getCountOfPlayers(game_id){
      return db.one('SELECT COUNT(*) FROM games_users WHERE game_id = ${game_id})', {
         game_id: game_id
      })
   }


}

module.exports = Games;