let UnoPileOfCards = require('./UnoPileOfCards');

module.exports =  class UnoPlayedCardsPile extends UnoPileOfCards {
  constructor() {
    super();
  }

  receiveKPlayedCards(playedCards) {
    this.insertCards(playedCards);
  }

  //Top of deck is the logo side facing you represented by the end of array
  //Bottom of deck is where the deck shows the value represented by front of array
  readBottomOfDeck() {
    return this.deckArray[0].getCardAttributes();
  }
}