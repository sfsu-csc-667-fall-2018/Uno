let UnoPileOfCards = require('./UnoPileOfCards');

module.exports = class UnoPlayerHandCards extends UnoPileOfCards {
  constructor() {
    super();
 }

 pickCardsAtIndices(index) {
    let selection = this.deckArray.splice(index, 1);
    return selection[0];
 }
}