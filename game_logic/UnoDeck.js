let UnoPileOfCards = require('./UnoPileOfCards');
let UnoCard = require('./UnoCard');
let UnoPlayer = require('./UnoPlayer');

const NUM_START_CARDS             = 7;
const NUM_ZERO_CARDS              = 4;
const NUM_ONE_TO_NINE_CARDS       = 8;
const NUM_TOTAL_ONE_TO_NINE_CARDS = NUM_ONE_TO_NINE_CARDS * 9;
const NUM_OF_SKIP_CARDS           = 8;
const NUM_OF_REVERSE_CARDS        = 8;
const NUM_OF_DRAW_TWO_CARDS       = 8;
const NUM_OF_WILD_CARDS           = 4;
const NUM_OF_WILD_FOUR_CARDS      = 4;
const NUM_TOTAL_CARDS             = NUM_TOTAL_ONE_TO_NINE_CARDS +
NUM_ZERO_CARDS + NUM_OF_WILD_CARDS +
NUM_OF_WILD_FOUR_CARDS + NUM_OF_SKIP_CARDS +
NUM_OF_REVERSE_CARDS + NUM_OF_DRAW_TWO_CARDS;

module.exports = class UnoDeck extends UnoPileOfCards {
  constructor() {
    super();
    this.createDeck();
    this.shuffleDeck();
  }

  createDeck() {
    //Create the deck
    //1. Create 0 cards
    for(let i = 0; i < NUM_ZERO_CARDS; i++) {
      this.deckArray.push(new UnoCard(UnoCard.NUMBER_CARD,
        UnoCard.ZERO_VALUE,
        UnoCard.CARD_COLOR_ARRAY[i],
        UnoCard.CARD_MAP_ID[i] + UnoCard.ZERO_VALUE));
    }

    //2. Create 1 - 9 cards
    for(let i = 1; i < 10; i++) {
      for(let j = 0; j < NUM_ONE_TO_NINE_CARDS; j++) {
        this.deckArray.push(new UnoCard(UnoCard.NUMBER_CARD,
          UnoCard.CARD_VALUE_ARRAY[i],
          UnoCard.CARD_COLOR_ARRAY[j%4],
          UnoCard.CARD_MAP_ID[j%4] + UnoCard.CARD_VALUE_ARRAY[i]));
      }
    }

    //3. Create Skip Cards
    for(let i = 0; i < NUM_OF_SKIP_CARDS; i++) {
      this.deckArray.push(new UnoCard(UnoCard.SKIP_CARD,
        UnoCard.SKIP_VALUE,
        UnoCard.CARD_COLOR_ARRAY[i%4],
        UnoCard.CARD_MAP_ID[i%4] + 10));
    }

    //4. Create Reverse Cards
    for(let i = 0; i < NUM_OF_REVERSE_CARDS; i++) {
      this.deckArray.push(new UnoCard(UnoCard.REVERSE_CARD,
        UnoCard.REVERSE_VALUE,
        UnoCard.CARD_COLOR_ARRAY[i%4],
        UnoCard.CARD_MAP_ID[i%4] + 11));
    }

    //5. Create Draw 2 Cards
    for(let i = 0; i < NUM_OF_DRAW_TWO_CARDS; i++) {
      this.deckArray.push(new UnoCard(UnoCard.DRAW_TWO_CARD,
        UnoCard.DRAW_TWO_VALUE,
        UnoCard.CARD_COLOR_ARRAY[i%4],
        UnoCard.CARD_MAP_ID[i%4] + 12));
    }

    //6. Create Wild Cards
    for(let i = 0; i < NUM_OF_WILD_CARDS; i++) {
      this.deckArray.push(new UnoCard(UnoCard.WILD_CARD,
        UnoCard.WILD_VALUE,
        UnoCard.CARD_COLOR_ARRAY[4],
        UnoCard.CARD_MAP_ID[4]));
    }

    //7. Create Wild Draw 4 cards
    for(let i = 0; i < NUM_OF_WILD_FOUR_CARDS; i++) {
      this.deckArray.push(new UnoCard(UnoCard.WILD_DRAW_FOUR_CARD,
        UnoCard.WILD_DRAW_FOUR_VALUE,
        UnoCard.CARD_COLOR_ARRAY[4],
        UnoCard.CARD_MAP_ID[4] + UnoCard.WILD_DRAW_FOUR_VALUE));
    }
  }

  //This
  shuffleDeck() {
    let currentIndex = this.deckArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.deckArray[currentIndex];
      this.deckArray[currentIndex] = this.deckArray[randomIndex];
      this.deckArray[randomIndex] = temporaryValue;
    }
  }

  dealCards(kPlayers, dealerIndex) {
    for(let i = 0; i < NUM_START_CARDS; i++) {
      for(let j = 0; j < kPlayers.length; j++) {
        let currIndex = (j + dealerIndex) % kPlayers.length;
        kPlayers[currIndex].receiveCards(this.getKCardsFromDeck(1));
      }
    }
  }

  emptyDeck() {
    return this.deckArray.splice(0, this.deckArray.length);
  }

  static get NUM_ONE_TO_NINE_CARDS(){
    return NUM_ONE_TO_NINE_CARDS;
  }

  static get NUM_TOTAL_ONE_TO_NINE_CARDS(){
    return NUM_TOTAL_ONE_TO_NINE_CARDS;
  }

  static get NUM_ZERO_CARDS() {
    return NUM_ZERO_CARDS;
  }

  static get NUM_OF_WILD_CARDS() {
    return NUM_OF_WILD_CARDS;
  }

  static get NUM_OF_WILD_FOUR_CARDS() {
    return NUM_OF_WILD_FOUR_CARDS;
  }

  static get NUM_OF_SKIP_CARDS() {
    return NUM_OF_SKIP_CARDS;
  }

  static get NUM_OF_REVERSE_CARDS() {
    return NUM_OF_REVERSE_CARDS;
  }
  static get NUM_OF_DRAW_TWO_CARDS () {
    return NUM_OF_DRAW_TWO_CARDS;
  }

  static get NUM_TOTAL_CARDS() {
    return NUM_TOTAL_CARDS;
  }

  static get NUM_START_CARDS() {
    return NUM_START_CARDS;
  }
};