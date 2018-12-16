

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

  setDealerPosition() {

  }
};