const UNO_MOVE_DRAW_CARD = "DRAW_CARD";
const UNO_MOVE_PLAY_CARDS = "PLAY_CARD";

class UnoMove {
  constructor(cardAttribute) { 
    this.attribute = cardAttribute;
  }

  getMoveAttributes() {
    return this.attribute;
  }
}