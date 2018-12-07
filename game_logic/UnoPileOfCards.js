module.exports =  class UnoPileOfCards {
  constructor() {
    this.deckArray = [];
  }

  getNumOfCardsLeft() {
    return this.deckArray.length;
  }

  //Top of deck is the logo side facing you represented by the end of array
  //Bottom of deck is where the deck shows the value represented by front of array
  getKCardsFromDeck(k, fromTopOfDeck = true) {
    if(k > this.deckArray.length) {
      throw("Trying to draw from an empty deck");
    }

    let cardsToReturn = [];
    if(fromTopOfDeck) {
      cardsToReturn = this.deckArray.splice(this.deckArray.length - k, k);
    }
    else {
      cardsToReturn = this.deckArray.splice(0, k);
    }
    return cardsToReturn;
  }

  insertCards(cardsToInsert, fromTopOfDeck = false) {
    for (let card of cardsToInsert) {
      if(fromTopOfDeck) {
        this.deckArray.push(card);
      }
      else {
        this.deckArray.unshift(card);
      }
    }
  }
};