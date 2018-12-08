let UnoDeck = require('./UnoDeck');
let UnoDrawCardsPile = require('./UnoDrawCardsPile');
let UnoPlayedCardsPile = require('./UnoPlayedCardsPile');

module.exports = class UnoGameBoard {
  constructor() {
    this.unoDeck = new UnoDeck();
    this.drawPile = new UnoDrawCardsPile();
    this.playedPile = new UnoPlayedCardsPile();
  }

  dealCardsToPlayers(kPlayers, dealerPos = 0) {
    // this.numOfPlayers = kPlayers.length;
    // this.unoDeck.dealCards(kPlayers, dealerPos);
    console.log("Dealing to player");
    for(let i = 0; i < UnoDeck.NUM_START_CARDS; i++) {
      for(let j = 0; j < kPlayers.length; j++) {
        let currIndex = (j + dealerIndex) % kPlayers.length;
        kPlayers[currIndex].receiveCards(this.unoDeck.getKCardsFromDeck(1));
      }
    }
  }

  setupDrawCardsPile() {
    this.drawPile.buildDrawCardsPile(this.unoDeck.emptyDeck());
  }

  setupPlayedCardsPile() {
    this.playedPile.receiveKPlayedCards(this.drawPile.getKNextCards(1));
  }

  resetDrawCardsPile() {
    let cardsToInsert = this.playedPile.getKCardsFromDeck(this.playedPile.getNumOfCardsLeft());
    this.drawPile.insertCards(cardsToInsert);
    this.drawPile.shuffleDeck();
  }

  getKCardsFromDrawCards(k) {
    let cards = []
    if(k > this.drawPile.getNumOfCardsLeft()) {
      let remaining = this.drawPile.getNumOfCardsLeft();
      k -= remaining;
      cards = this.drawPile.getKNextCards(remaining);

      this.resetDrawCardsPile();

      remainingCards = this.drawPile.getKNextCards(k);
      for(let c of remainingCards) {
        cards.push(c);
      }
    }
    else {
      cards = this.drawPile.getKNextCards(k);
    }

    return cards;
  }

  putCardToPlayedCards(kCard) {
    this.playedPile.receiveKPlayedCards([kCard]);
  }

  getTopPlayedCardsAttribute() {
    return this.playedPile.readBottomOfDeck();
  }

  //For Server interaction
  getDrawDeckCards() {
    return this.drawPile.deckArray;
  }

  getPlayedDeckCards() {
    return this.playedPile.deckArray;
  }
};