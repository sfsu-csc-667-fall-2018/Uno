//Card Categories
const UNO_CARD_TYPE   = "TYPE";
const UNO_CARD_VALUE  = "VALUE";
const UNO_CARD_COLOR  = "COLOR";

//Card Value Constants
const NUMBER_CARD         = "NUMBER_CARD";
const SKIP_CARD           = "SKIP_CARD";
const REVERSE_CARD        = "REVERSE_CARD";
const DRAW_TWO_CARD       = "DRAW_TWO_CARD";
const WILD_CARD           = "WILD_CARD";
const WILD_DRAW_FOUR_CARD = "WILD_DRAW_FOUR_CARD";

const CARD_TYPE_ARRAY = [ NUMBER_CARD,
                          SKIP_CARD,
                          REVERSE_CARD,
                          DRAW_TWO_CARD,
                          WILD_CARD,
                          WILD_DRAW_FOUR_CARD ];

//Card Color Constants
const RED_COLOR     = "RED";
const YELLOW_COLOR  = "YELLOW";
const GREEN_COLOR   = "GREEN";
const BLUE_COLOR    = "BLUE";
const BLACK_COLOR   = "BLACK"

const CARD_COLOR_ARRAY = [ RED_COLOR,
                           GREEN_COLOR,
                           BLUE_COLOR,
                           YELLOW_COLOR,
                           BLACK_COLOR ];

//Card Value Constants
const ZERO_VALUE          = 0;
const ONE_VALUE           = 1;
const TWO_VALUE           = 2;
const THREE_VALUE         = 3;
const FOUR_VALUE          = 4;
const FIVE_VALUE          = 5;
const SIX_VALUE           = 6;
const SEVEN_VALUE         = 7;
const EIGHT_VALUE         = 8;
const NINE_VALUE          = 9;
const SKIP_VALUE          = 20;
const REVERSE_VALUE       = 20;
const DRAW_TWO_VALUE      = 20;
const WILD_VALUE          = 50;
const WILD_DRAW_FOUR_VALUE = 50;

const CARD_VALUE_ARRAY = [ ZERO_VALUE,
                           ONE_VALUE,
                           TWO_VALUE,
                           THREE_VALUE,
                           FOUR_VALUE,
                           FIVE_VALUE,
                           SIX_VALUE,
                           SEVEN_VALUE,
                           EIGHT_VALUE,
                           NINE_VALUE,
                           SKIP_VALUE,
                           REVERSE_VALUE,
                           DRAW_TWO_VALUE,
                           WILD_VALUE,
                           WILD_DRAW_FOUR_VALUE ];

const RED_MAP_ID        = 0;
const GREEN_MAP_ID      = 13;
const BLUE_MAP_ID       = 26;
const YELLOW_MAP_ID     = 39;
const BLACK_MAP_ID      = 100;

//
const CARD_MAP_ID = [
  RED_MAP_ID,
  GREEN_MAP_ID,
  BLUE_MAP_ID,
  YELLOW_MAP_ID,
  BLACK_MAP_ID
];

class UnoCard {
  constructor(type, value, color, mapId){
    this.typeOfCard = type;
    this.valueOfCard = value;
    this.colorOfCard = color
    this.mapId = mapId;
  }

  getCardAttributes() {
    let cardAttributes = {};
    cardAttributes[UNO_CARD_TYPE] = this.typeOfCard;
    cardAttributes[UNO_CARD_VALUE] = this.valueOfCard;
    cardAttributes[UNO_CARD_COLOR] = this.colorOfCard;
    return cardAttributes;
  }

  //How to sort cards if needed
  static cardSortCriteria(a, b) {
    if(a.valueOfCard === b.valueOfCard) {
      if (a.typeOfCard < b.typeOfCard) {
        return 1;
      }
      else if (a.typeOfCard < b.typeOfCard) {
        return -1;
      }
      else {
        if(a.colorOfCard > b.colorOfCard) {
          return 1;
        }
        else if(a.colorOfCard > b.colorOfCard) {
          return -1;
        }
        else {
          return 0;
        }
      }
    }
    else {
      return a.valueOfCard - b.valueOfCard;
    }
  }

  //Constant getters
  //Type constant getters
  static get NUMBER_CARD() {
    return NUMBER_CARD;
  }
  static get SKIP_CARD() {
    return SKIP_CARD;
  }       
  static get REVERSE_CARD() {
    return REVERSE_CARD;
  }   
  static get DRAW_TWO_CARD() {
    return DRAW_TWO_CARD;
  }
  static get WILD_CARD() {
    return WILD_CARD;
  }
  static get WILD_DRAW_FOUR_CARD() {
    return WILD_DRAW_FOUR_CARD;
  }

  static get CARD_TYPE_ARRAY() {
    return CARD_TYPE_ARRAY;
  }

  //Color constant getters
  static get RED_COLOR() {
    return RED_COLOR;
  } 

  static get YELLOW_COLOR() {
    return YELLOW_COLOR;
  }

  static get GREEN_COLOR() {
    return GREEN_COLOR;
  }

  static get BLUE_COLOR() {
    return BLUE_COLOR;
  }

  static get BLACK_COLOR() {
    return BLACK_COLOR;
  }

  static get CARD_COLOR_ARRAY() {
    return CARD_COLOR_ARRAY;
  }

  //Value constant getters
  static get ZERO_VALUE() {
    return ZERO_VALUE;
  }

  static get ONE_VALUE() {
    return ONE_VALUE;
  }

  static get TWO_VALUE() {
    return TWO_VALUE;
  }

  static get THREE_VALUE() {
    return THREE_VALUE;
  }

  static get FOUR_VALUE() {
    return FOUR_VALUE;
  }

  static get FIVE_VALUE() {
    return FIVE_VALUE;
  }

  static get SIX_VALUE() {
    return SIX_VALUE;
  }

  static get SEVEN_VALUE() {
    return SEVEN_VALUE;
  }

  static get EIGHT_VALUE() {
    return EIGHT_VALUE;
  }

  static get NINE_VALUE() {
    return NINE_VALUE;
  }

  static get SKIP_VALUE() {
    return SKIP_VALUE;
  }
  static get REVERSE_VALUE() {
    return REVERSE_VALUE;
  }

  static get DRAW_TWO_VALUE() {
    return DRAW_TWO_VALUE;
  }

  static get WILD_VALUE() {
    return WILD_VALUE;
  }

  static get WILD_DRAW_FOUR_VALUE() {
    return WILD_DRAW_FOUR_VALUE;
  }

  static get CARD_VALUE_ARRAY() {
    return CARD_VALUE_ARRAY;
  }

  static get CARD_COLOR_ARRAY() {
    return CARD_COLOR_ARRAY;
  }

  static get UNO_CARD_TYPE() {
    return UNO_CARD_TYPE;
  }

  static get UNO_CARD_VALUE() {
    return UNO_CARD_VALUE;
  } 

  static get UNO_CARD_COLOR() {
    return UNO_CARD_COLOR;
  }

  static get CARD_MAP_ID() {
    return CARD_MAP_ID;
  }
}