class UnoDrawCardsPile extends UnoDeck {
  constructor() {
    super();
    this.deckArray = [];
  }

  getKNextCards(k) {
    return this.getKCardsFromDeck(k);
  }

  buildDrawCardsPile(cardsToInsert) {
    this.insertCards(cardsToInsert, true);
    this.shuffleDeck();
  }
}