const MAX_NUM_PLAYERS   = 8;
const MIN_NUM_PLAYERS   = 2;

const CLOCKWISE         = true;
const COUNTER_CLOCKWISE = false;

const TARGET_POINTS = 500;

class UnoGameRoom {
  constructor(gameName, gameID) {
    this.gameName = gameName;
    this.gameID = gameID;
    this.gameBoard = new UnoGameBoard();
    this.playerSeats = new UnoPlayerSeats();
    this.unoMoveChecker = new UnoMoveChecker();
    
    this.playerReached500Points = false;
    this.directionOfPlay = CLOCKWISE;
    this.currentPlayerPos = 0;
    this.dealerPosition = 0;
    this.playerFinished = false;
    this.finishedPlayerPos = -1;
  }

  addPlayer(kPlayer) {
    if(this.playerSeats.getNumOfPlayers() < MAX_NUM_PLAYERS) {
      this.playerSeats.addPlayer(kPlayer);
      return true;
    }
    else {
      return false;
    }
  }

  playerExits() {
    
  }

  getNumOfPlayers() {
    return this.playerSeats.getNumOfPlayers();
  }

  startRound() {
    this.directionOfPlay = CLOCKWISE;
    this.gameBoard.dealCardsToPlayers(this.playerSeats.playerArray, this.dealerPosition);
    this.gameBoard.setupDrawCardsPile();
    this.gameBoard.setupPlayedCardsPile();
    this.unoMoveChecker.resetMoveResult();
    this.unoMoveChecker.getTopOfPlayedPileCardAttributes(this.gameBoard.getTopPlayedCardsAttribute());
    this.currentPlayerPos = this.dealerPosition;
    this.updatePlayerPosition();
  }

  sumPlayerCards(player) {
    let sum = 0;
    let cards = player.getCardsInHand();
    for(let c in cards) {
      sum += c.valueOfCard;
    }
    return sum;
  }

  calculatePlayersScores() {
    let roundTotal = 0;
    for (let i = 0; i < this.playerSeats.getNumOfPlayers(); i++){
      if(i != this.currentPlayerPos) {
        roundTotal += sumPlayerCards(this.playerSeats.playerArray[i]);
      }
    }
    this.playerSeats.playerArray[this.currentPlayerPos].updateMyScore(roundTotal);
    if(this.playerSeats.playerArray[this.currentPlayerPos].mySvore >= TARGET_POINTS) {
      this.playerReached500Points = true;  
    }
    this.playerReached500Points = true;
    this.dealerPosition = (this.dealerPosition + 1) % this.playerSeats.getNumOfPlayers();
  }

  isPlayerFinished(currentPlayer) {
    if(currentPlayer.getNumOfCardsInHand() === 0) {
      this.playerFinished = true;
    }
  }

  updatePlayerPosition() {
    if(this.directionOfPlay === CLOCKWISE) {
      this.currentPlayerPos = (this.currentPlayerPos + 1) % this.playerSeats.getNumOfPlayers();
    }
    else {
      this.currentPlayerPos -= 1;
      if(this.currentPlayerPos < 0) {
        this.currentPlayerPos = this.playerSeats.getNumOfPlayers()-1;
      }
    }
  }

  playACardMove(currentPlayer, cardIndex) {

  }

  drawACardMove(currentPlayer) {

  }

  startGame() {
    if(this.playerSeats.playerArray.length < MIN_NUM_PLAYERS) {
      alert("NOT ENOUGH PLAYERS");
      return;
    }

    do {
      this.startRound();
      let resultOfLastPlay = this.unoMoveChecker.moveResult;
      //this.showDeck();
      while(!this.playerFinished) {
        let currentPlayer = this.playerSeats.getCurrentPlayer(this.currentPlayerPos);
        let currTopCard = this.gameBoard.getTopPlayedCardsAttribute();
        this.unoMoveChecker.getTopOfPlayedPileCardAttributes(currTopCard);

        //DEBUG MESSAGE
        console.log("================== NEW TURN ==================");
        console.log("CURRENT TOP CARD " + currTopCard[UnoCard.UNO_CARD_TYPE] + " " + currTopCard[UnoCard.UNO_CARD_COLOR] + " " + currTopCard[UnoCard.UNO_CARD_VALUE]);

        //for debugging purposes
        //for now use prompt
        this.getPlayerState(currentPlayer, true);
        if(resultOfLastPlay === UnoMoveChecker.MOVE_RESULT_NEXT_PLAYER_DRAW_FOUR) {
          currentPlayer.receiveCards(this.gameBoard.getKCardsFromDrawCards(4));
          this.unoMoveChecker.resetMoveResult();
        }
        else if(resultOfLastPlay === UnoMoveChecker.MOVE_RESULT_NEXT_PLAYER_DRAW_TWO) {
          currentPlayer.receiveCards(this.gameBoard.getKCardsFromDrawCards(2));
          this.unoMoveChecker.resetMoveResult();
        }
        else if(resultOfLastPlay === UnoMoveChecker.MOVE_RESULT_NEXT_PLAYER_SKIP ) {
          console.log("SKIPPING PLAYER " + currentPlayer.name);
          this.unoMoveChecker.resetMoveResult();
        }
        else { //UnoMoveChecker.MOVE_RESULT_DEFAULT or UnoMoveChecker.MOVE_RESULT_CHOOSE_COLOR
          let move = prompt(currentPlayer.name + " -- Pick a move: (1) draw a card (2) play a card "); 
          if(move === "q") {break;}
          alert("chose " + (move === "1" ? " draw a card" : " play a card"));
          this.unoMoveChecker.resetMoveResult();
          //Draw or play card
          if (move === "1") {
            let card = this.gameBoard.getKCardsFromDrawCards(1);
            alert("DREW " + card[0].typeOfCard + " " + card[0].valueOfCard + " " + card[0].colorOfCard);
            currentPlayer.receiveCards(card);
          }
          else {
            let response = prompt("Pick a card from your hand");
            let index = parseInt(response, 10);
            let card = currentPlayer.proposeCardToPlay(index);
            let move = new UnoMove(card);
            if(this.unoMoveChecker.checkMoveValidity(move)) {
              this.gameBoard.putCardToPlayedCards(currentPlayer.playCardMove(index));
            }
            else {
              alert("ILLEGAL MOVE");
            }
          }
        }

        this.getPlayerState(currentPlayer, false);
        resultOfLastPlay = this.unoMoveChecker.moveResult;
        if(resultOfLastPlay === UnoMoveChecker.MOVE_RESULT_REVERSE_PLAY_DIRECTION) {
          console.log("REVERSING PLAY DIRECTION");
          this.directionOfPlay = !this.directionOfPlay;
          this.unoMoveChecker.resetMoveResult();
        }
        
        if(resultOfLastPlay === UnoMoveChecker.MOVE_RESULT_CHOOSE_COLOR ||
           resultOfLastPlay === UnoMoveChecker.MOVE_RESULT_NEXT_PLAYER_DRAW_FOUR) {
          let newColor = prompt("Choose color of next move. (0) Red (1) Green (2) Blue (3) Yellow");
          this.unoMoveChecker.playerSelectedColor = UnoCard.CARD_COLOR_ARRAY[parseInt(newColor, 10)];
        }

        this.isPlayerFinished(currentPlayer);
        if(!this.playerFinished) {
          this.updatePlayerPosition();
        }
      }

      this.calculatePlayersScores();
      this.showPlayerScores(this.playerSeats.playerArray);
    } while(!this.playerReached500Points);

    //game ended
  }

  static get MAX_NUM_PLAYERS() {
    return MAX_NUM_PLAYERS;
  }
  static get MIN_NUM_PLAYERS() {
    return MIN_NUM_PLAYERS;
  }
  static get CLOCKWISE(){
    return CLOCKWISE;
  }
  static get COUNTER_CLOCKWISE() {
    return COUNTER_CLOCKWISE;
  }

  getPlayerState(kPlayer, before=true) {
    if(before) {
      console.log("===== BEFORE TURN =====");
    }
    else {
      console.log("===== AFTER TURN =====");
    }
    console.log("===== " + kPlayer.name + " =====");
    let cards = "\n";
    let i = 0;
    for(let card of kPlayer.myHand.deckArray) {
      cards += i + " " + card.typeOfCard + " " + card.valueOfCard + " " + card.colorOfCard + " \n";
      i++;
    }
    console.log(cards);
  }

  showPlayerScores(players) {
    for(let p of players) {
      console.log("Player " + p.name + " Score: " + p.myScore);
    }
  }

  //FOR SERVER INTERACTION
  getDrawDeckCards() {
    return this.gameBoard.getDrawDeckCards();
  }

  getPlayedDeckCards() {
    return this.gameBoard.getPlayedDeckCards();
  }

  showDeck() {
    for(let c in this.gameBoard.unoDeck.deckArray) {
      console.log(c);
    }
  }
};
