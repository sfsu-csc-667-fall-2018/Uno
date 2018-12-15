let UnoCard = require('./UnoCard');

const MOVE_RESULT_NEXT_PLAYER_SKIP = "SKIP_TURN";
const MOVE_RESULT_REVERSE_PLAY_DIRECTION = "REVERSE_DIRECTION";
const MOVE_RESULT_NEXT_PLAYER_DRAW_FOUR = "DRAW_FOUR";
const MOVE_RESULT_NEXT_PLAYER_DRAW_TWO = "DRAW_TWO";
const MOVE_RESULT_CHOOSE_COLOR = "CHOOSE_COLOR";
const MOVE_RESULT_DEFAULT = "DEFAULT";

module.exports =  class UnoMoveChecker {
  constructor() {
    this.topCardAttributes = {};
    this.moveResult = MOVE_RESULT_DEFAULT;
    this.playerSelectedColor = "";
  }

  resetMoveResult() {
    this.moveResult = MOVE_RESULT_DEFAULT;
  }

  checkMoveValidity(theMove) {
    let currentColor = this.topCardAttributes[UnoCard.UNO_CARD_COLOR];

    if(currentColor === UnoCard.BLACK_COLOR) {
      currentColor = this.playerSelectedColor;
      this.playerSelectedColor = "";
    }

    let currentType = this.topCardAttributes[UnoCard.UNO_CARD_TYPE];
    let currentValue = this.topCardAttributes[UnoCard.UNO_CARD_VALUE];

    // let moveCard = theMove.getMoveAttributes();
    let moveCard = theMove.getCardAttributes();
    let isWildPresent = moveCard[UnoCard.UNO_CARD_TYPE] === UnoCard.WILD_CARD ||
    moveCard[UnoCard.UNO_CARD_TYPE] === UnoCard.WILD_DRAW_FOUR_CARD;
    let colorMatch = moveCard[UnoCard.UNO_CARD_COLOR] === currentColor;
    let valueMatch = moveCard[UnoCard.UNO_CARD_VALUE] === currentValue;
    let typeMatch = moveCard[UnoCard.UNO_CARD_TYPE] === currentType;

    console.log("CURRENT CARD " + currentColor + " " + currentType + " " + currentValue);
    console.log("MOVE CARD " + moveCard[UnoCard.UNO_CARD_COLOR] + " " + moveCard[UnoCard.UNO_CARD_TYPE] + " " + moveCard[UnoCard.UNO_CARD_VALUE]);

    if((colorMatch || (valueMatch && typeMatch)) || isWildPresent) {
      if(moveCard[UnoCard.UNO_CARD_TYPE] === UnoCard.SKIP_CARD) {
        this.moveResult = MOVE_RESULT_NEXT_PLAYER_SKIP;
      }
      else if(moveCard[UnoCard.UNO_CARD_TYPE] === UnoCard.REVERSE_CARD) {
        this.moveResult = MOVE_RESULT_REVERSE_PLAY_DIRECTION;
      }
      else if(moveCard[UnoCard.UNO_CARD_TYPE] === UnoCard.DRAW_TWO_CARD) {
        this.moveResult = MOVE_RESULT_NEXT_PLAYER_DRAW_TWO;
      }
      else if(moveCard[UnoCard.UNO_CARD_TYPE] === UnoCard.WILD_DRAW_FOUR_CARD) {
        this.moveResult = MOVE_RESULT_NEXT_PLAYER_DRAW_FOUR;
      }
      else if(moveCard[UnoCard.UNO_CARD_TYPE] === UnoCard.WILD_CARD) {
        this.moveResult = MOVE_RESULT_CHOOSE_COLOR;
      }
      else {
        this.moveResult = MOVE_RESULT_DEFAULT;
      }

      return true;
    }

    return false;
  }

  getTopOfPlayedPileCardAttributes(topOfPlayedPile) {
    this.topCardAttributes = topOfPlayedPile;
  }

  static get MOVE_RESULT_NEXT_PLAYER_SKIP() {
    return MOVE_RESULT_NEXT_PLAYER_SKIP;
  }

  static get MOVE_RESULT_REVERSE_PLAY_DIRECTION() {
    return MOVE_RESULT_REVERSE_PLAY_DIRECTION;
  }

  static get MOVE_RESULT_NEXT_PLAYER_DRAW_FOUR() {
    return MOVE_RESULT_NEXT_PLAYER_DRAW_FOUR;
  }

  static get MOVE_RESULT_NEXT_PLAYER_DRAW_TWO() {
    return MOVE_RESULT_NEXT_PLAYER_DRAW_TWO;
  }

  static get MOVE_RESULT_CHOOSE_COLOR() {
    return MOVE_RESULT_CHOOSE_COLOR;
  }

  static get MOVE_RESULT_DEFAULT() {
    return MOVE_RESULT_DEFAULT;
  }
}