

module.exports = class UnoPlayerSeats {
  constructor() {
    this.playerArray = [];
  }

  getNumOfPlayers() {
    return this.playerArray.length;
  }

  getPlayerAt(playerPos) {
    return this.playerArray[playerPos];
  }

  addPlayer(newPlayer) {
    this.playerArray.push(newPlayer);
  }

  playerLeaves(kPlayer) {

  }

  getPlayerIndex(playerName){
    let index = -1;
    for(let i=0; i<this.playerArray.length; i++){
      if(this.playerArray[i].name === playerName ){
        index = i;
        break;
      }
    }
    if(index < 0){
      throw "Player not found in player seats";
    }
    return index;
  }

  setDealerPosition() {

  }
};