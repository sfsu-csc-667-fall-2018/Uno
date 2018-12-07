const gamelogic = require('../game_logic');

const gameSession = (io, db, name) => {
   console.log('==========We got to here)');

   const gamelogic = new gamelogic.UnoGameRoom(name,1);
   //get players from db
   let player1 = new UnoPlayer("moses");
   let player2 = new UnoPlayer("tim");
   let player3 = new UnoPlayer("preston");
   let player4 = new UnoPlayer("chris");
   let player5 = new UnoPlayer("pablo");

   gamelogic.addPlayer(player1);
   gamelogic.addPlayer(player2);

   console.log('==========We got to here)');
}

module.exports = gameSession;