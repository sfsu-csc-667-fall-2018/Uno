let UnoPlayerHandCards = require('./UnoPlayerHandCards');

module.exports =  class UnoPlayer {
  constructor(name) {
    this.name = name;
    this.myHand = new UnoPlayerHandCards();
    this.amIDealer = false;
    this.myScore = 0;
  }

  receiveCards(kCards) {
    this.myHand.insertCards(kCards);
  }

  proposeCardToPlay(index) {
    let proposedCard = this.myHand.deckArray[index].getCardAttributes();
    return proposedCard;
  }

  playCardMove(index) {
    let cardToPlay = this.myHand.pickCardsAtIndices([index]);
    return cardToPlay;
  }

  drawCardMove(drawnCards) {
    this.myHand.insertCards(drawnCards);
  }

  setIAmDealer(amIDealer) {
    this.amIDealer = amIDealer;
  }

  updateMyScore(total) {
    this.myScore += total;
  }

  getNumOfCardsInHand() {
    return this.myHand.getNumOfCardsLeft();
  }

  unoStatus() {
    return this.myHand.getNumOfCardsLeft() === 1;
  }

  getCardsInHand() {
    return this.myHand.getKCardsFromDeck(this.myHand.getNumOfCardsLeft());
  }
}