let UnoGameBoard = require('./UnoGameBoard');
let UnoPlayerSeats = require('./UnoPlayerSeats');
let UnoMoveChecker = require('./UnoMoveChecker');

const MAX_NUM_PLAYERS   = 8;
const MIN_NUM_PLAYERS   = 2;

const CLOCKWISE         = true;
const COUNTER_CLOCKWISE = false;

const TARGET_POINTS = 500;

const DRAW_CARD_MOVE = 1;
const PLAY_CARD_MOVE = 2;


module.exports = class UnoGameRoom {
  constructor( gameID) {
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
    this.gameStarted = false;
  }

  addPlayer(kPlayer) {
    console.log("GAME ID " + this.gameID + " Added: "+kPlayer.name);
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
    console.log("AFTER UPDATING currentPlayerPos " + this.currentPlayerPos);
  }

  startGame() {
    if(this.playerSeats.playerArray.length < MIN_NUM_PLAYERS) {
      alert("NOT ENOUGH PLAYERS");
      return false;
    }
    else {
      alert("STARTING GAME WTIH " + this.playerSeats.playerArray.length + " PLAYERS");
      return true;
    }
  }

  function() {
  //   do {
  //     while(!this.playerFinished) {


  //       //for debugging purposes
  //       //for now use prompt
  //       this.getPlayerState(currentPlayer, true);



  //       this.getPlayerState(currentPlayer, false);
  //       resultOfLastPlay = this.unoMoveChecker.moveResult;
  //       if(resultOfLastPlay === UnoMoveChecker.MOVE_RESULT_REVERSE_PLAY_DIRECTION) {
  //         console.log("REVERSING PLAY DIRECTION");
  //         this.directionOfPlay = !this.directionOfPlay;
  //         this.unoMoveChecker.resetMoveResult();
  //       }

  //       if(resultOfLastPlay === UnoMoveChecker.MOVE_RESULT_CHOOSE_COLOR ||
  //        resultOfLastPlay === UnoMoveChecker.MOVE_RESULT_NEXT_PLAYER_DRAW_FOUR) {
  //         let newColor = prompt("Choose color of next move. (0) Red (1) Green (2) Blue (3) Yellow");
  //       this.unoMoveChecker.playerSelectedColor = UnoCard.CARD_COLOR_ARRAY[parseInt(newColor, 10)];
  //     }

  //     this.isPlayerFinished(currentPlayer);
  //     if(!this.playerFinished) {
  //       this.updatePlayerPosition();
  //     }
  //   }

  //   this.calculatePlayersScores();
  //   this.showPlayerScores(this.playerSeats.playerArray);
  // } while(!this.playerReached500Points);

    //game ended
  }

  getCurrentPlayer() {
    console.log("CURRENT PLAYER INDEX " + this.currentPlayerPos);
    let currentPlayer = this.playerSeats.getPlayerAt(this.currentPlayerPos);
    return currentPlayer;
  }

  checkResultOfLastMove() {
    let currTopCard = this.gameBoard.getTopPlayedCardsAttribute();
    this.unoMoveChecker.getTopOfPlayedPileCardAttributes(currTopCard);
    let resultOfLastPlay = this.unoMoveChecker.moveResult;

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
       this.unoMoveChecker.resetMoveResult();
      // //Draw or play card
      // if (move === DRAW_CARD_MOVE) {
      //   let card = this.gameBoard.getKCardsFromDrawCards(1);
      //   currentPlayer.receiveCards(card);
      // }
      // else {
      //   let card = currentPlayer.proposeCardToPlay(index);
      //   let move = new UnoMove(card);
      //   if(this.unoMoveChecker.checkMoveValidity(move)) {
      //     this.gameBoard.putCardToPlayedCards(currentPlayer.playCardMove(index));
      //   }
      // }
    }
    return resultOfLastPlay;
  }

  drawPlayerCards(numOfCards=1) {
    return this.gameBoard.getKCardsFromDrawCards(numOfCards);
  }

  finishTurn() {

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

  static get DRAW_CARD_MOVE() {
    return DRAW_CARD_MOVE;
  }

  static get PLAY_CARD_MOVE() {
    return PLAY_CARD_MOVE;
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

  getPlayerHands(kPlayerName) {
    for(let player of this.playerSeats.playerArray) {
      if(player.name === kPlayerName) {
        //console.log("GETTING CARDS FROM PLAYER: "+JSON.stringify(player))
        return player.getCardInfo();
      }
    }
  }

  getCurrentTopCardAttributes() {
    return this.gameBoard.getTopPlayedCardsAttribute();
  }

  getPlayers() {
    return this.playerSeats.playerArray;
  }

  currentPlayerDrewACard() {
    let prevResult = this.checkResultOfLastMove();
    console.log("PREV RESULT === " + prevResult);
    if(prevResult != UnoMoveChecker.MOVE_RESULT_DEFAULT) {
      console.log("This was the previous move result " + prevResult);
      return false;
    }

    try {
      this.getCurrentPlayer().receiveCards(this.gameBoard.getKCardsFromDrawCards(1));
    }
    catch (err) {
      console.log("ERROR DRAWING CARD " + err);
      return false;
    }
    return true;
  }

  currentPlayerPlayedACard(cardIndex) {
    let prevResult = this.checkResultOfLastMove();

    if(prevResult != UnoMoveChecker.MOVE_RESULT_DEFAULT) {
      console.log("This was the previous move result " + prevResult);
      return true;
    }

    try {
      let cardToPlay = this.getCurrentPlayer().playCardMove(cardIndex);
      let result = this.unoMoveChecker.checkMoveValidity(cardToPlay);
      if(!result) {
        this.getCurrentPlayer().receiveCards([cardToPlay]);
        return result;
      }
      this.gameBoard.putCardToPlayedCards(cardToPlay);
    }
    catch(err) {
      //
      console.log("Something horrible happened playing a card " + err);
      return false;
    }
    return true;
  }

  showDeck() {
    for(let c in this.gameBoard.unoDeck.deckArray) {
      console.log(c);
    }
  }
};
