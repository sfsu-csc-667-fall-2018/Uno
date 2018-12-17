(() => {

  let isTurn = false;
  let successfulMove = true;
  let target_id;


  function setUpInitialGameBoard(){
    let text = document.createElement("div");
    text.setAttribute("id","start-game-message");
    text.innerHTML = "Waiting for game to start";





    let button = document.createElement('button');
    button.setAttribute("id","start-game");
    button.setAttribute("type","button");
    button.setAttribute("class","play-button btn btn-lg btn-primary");
    button.innerHTML = "Start Game";

    document.getElementById("waitScreenText").appendChild(text);
    document.getElementById("waitScreenButton").appendChild(button);

    let node = document.createElement('img');
    //node.setAttribute("src",link);
    node.setAttribute("id", "discard-pile-id");
    node.setAttribute("alt","inn_logo");
    node.setAttribute("class","discard-pile");
    document.getElementById("discard-deck").appendChild(node);
  }

  function removeInitialGameElements(){
    let blur = document.getElementById("waitScreenBlur");
    document.getElementById("start-game-message").remove();
    document.getElementById("start-game").remove();
    blur.classList.remove("wait-screen-blur");
  }

  setUpInitialGameBoard()

  let game_id = document.URL.slice(document.URL.indexOf("=")+1);
  socket.emit('join game', {gameid : game_id});


   $('#start-game').on('click', event => {

      console.log("clicked on start game ==============="+ document.URL);

      event.preventDefault();
      let user_info = {
         'gameid':game_id,
      }
      socket.emit('start game',user_info);
  });

   //Some function here to play cards
  $('#play-card').on('click', event => {
    event.preventDefault();
    socket.emit('play card', {gameid : game_id});
  });

   //Some function to draw cards
  $('#drawdeck').on('click', event => {
    event.preventDefault();
    console.log("CLICKED ON DRAW A CARD");
    socket.emit('draw card', {gameid : game_id});
  });

  $('#blueButton').on('click', event => {
    console.log("CLICKED ON NEW COLOR BLUE");
    colorClickHandler("BLUE");
  });

  $('#greenButton').on('click', event => {
    console.log("CLICKED ON NEW COLOR GREEN");
    colorClickHandler("GREEN");
  });

  $('#redButton').on('click', event => {
    console.log("CLICKED ON NEW COLOR RED");
    colorClickHandler("RED");
  });

  $('#yellowButton').on('click', event => {
    console.log("CLICKED ON NEW COLOR YELLOW");
    colorClickHandler("YELLOW");
  });

  socket.on('join game response', data => {
    if(data.loggedIn == false){
      alert("You have to log in before joining a game");
      window.location.replace('/');
    }else if(data.alreadyJoined){
      let game_id = document.URL.slice(document.URL.indexOf("=")+1);
      socket.emit('current discard top card', {gameid : game_id});
      socket.emit('get players name', {gameid : game_id});
      socket.emit('get player card', {gameid : game_id});
      socket.emit('get is it my turn', {gameid : game_id});
      removeInitialGameElements();
    }else if(data.gameIsFull){
      alert("Game is already full");
      window.location.replace('/lobby');
    }else if(data.alreadyJoined == false && data.alreadyStarted == true){
      alert("You can't join a game that has already started");
      window.location.replace('/lobby');
      //CODE FOR SPECTATOR
      /*let game_id = document.URL.slice(document.URL.indexOf("=")+1);
      socket.emit('current discard top card', {gameid : game_id});
      socket.emit('get players name', {gameid : game_id});
      removeInitialGameElements();
      alert("Game has already started, you have joined as an spectator");*/
    }
  });

  socket.on('start game response', data => {
    //Preston and Chris fill in here

    if(data.result) {
      let game_id = document.URL.slice(document.URL.indexOf("=")+1);
      console.log("========= GAME STARTED!!! ============");
      socket.emit('current discard top card', {gameid : game_id});
      socket.emit('get players name', {gameid : game_id});
      socket.emit('get player card', {gameid : game_id});
      socket.emit('get is it my turn', {gameid : game_id});
      removeInitialGameElements();
    }
    else {
      console.log("========= GAME FAILED TO START!!! ============");
    }
  });

  socket.on('get players state response', data =>{
    if(data.result) {
        console.log("========= HERE ARE PLAYERS IN THE GAME!!! ============");
        console.log(JSON.stringify(data.players_names));


        for(let i = 0; i < data.players_names.length; i++) {
            console.log("player"+i+"name");
          let name = document.getElementById("player"+(i+2)+"name");

            name.innerHTML = data.players_names;
        }


        console.log(data.currentPlayerIndex);
    }
     else {
       console.log("========= COULD NOT GET PLAYERS ============");
     }
  });


  socket.on('get num players response', data => {
    //Preston and Chris fill in here
  });

  socket.on('get is it my turn response', data => {
    let turn_message = document.getElementById("player-turn-message");

    if(turn_message.firstChild) {
      turn_message.removeChild(turn_message.firstChild);
    }
    socket.emit('get players state', {gameid : game_id });

    if(data.result) {
      if(data.myTurn) {
        console.log("========= MY TURN ============");
          isTurn = true;
          let text = document.createElement("h1");
          text.innerHTML = "MY TURN";
          turn_message.appendChild(text);
      }
      else {
        console.log("========= NOT MY TURN ============");
          isTurn = false;
          let text = document.createElement("h1");
          text.innerHTML = "NOT MY TURN";
          turn_message.appendChild(text);
      }
    }
    else {
      console.log("========= COULD NOT GET PLAYERS TURN ============");
    }
  });

  socket.on('display wild response', data => {
    console.log("Displaying wild response");
    displayWildCardColor();
  });

  socket.on('get player card response', data => {
    //Preston and Chris fill in here
    if(data.result) {
      console.log("========= HERE IS MY INFO!!! ============");
      console.log(JSON.stringify(data.cardsToSend));
      updateUserDeck(data.cardsToSend);
    }
    else {
      console.log("========= COULD NOT GET MY INFO!!! ============");
    }
  });

  socket.on('get play result response', data => {
    //Preston and Chris fill in here
  });

  socket.on('current discard top card response', data => {
    //Preston and Chris fill in here
    if(data.result) {
      console.log("========= GOT TOP CARD!!! ============");
      console.log("CARD ATTR ==> " + JSON.stringify(data.currentTopCard));
      updateDiscardDeck(data.currentTopCard);
      socket.emit('get is it my turn', {gameid : game_id});
    }
    else {
      console.log("========= FAILED TO GET TOP CARD!!! ============");
    }
  });

  socket.on('draw card response', data => {
    console.log("I DREW A CARD");
    if(data.result) {
      console.log("SUCCESSSFULLY");
      socket.emit('get is it my turn', {gameid : game_id});
    }
    else {
      alert("NOT MY TURN");
      console.log("FAILED " + data.message);
    }
  });

  socket.on('play card response', data => {
    console.log("I PLAYED A CARD");

    successfulMove = false;

    if(data.result) {
      successfulMove = true;
      console.log("SUCCESSFULLY");
      socket.emit('get is it my turn', {gameid : game_id});
      let color = document.getElementById("discard-pile-id");
      color.classList.add("discard-pile");
    }
    else {

      alert(data.message);
      console.log("FAILED " + data.message);
      unHighlight();
      successfulMove = false;

    }
    console.log(successfulMove);
  });

  socket.on('get other player data response', data => {
    //Preston and Chris fill in here
  });

  socket.on('get current player points response', data => {
    //Preston and Chris fill in here
  });

  socket.on('get play response', data => {
    //Preston and Chris fill in here
  });

  socket.on('chose color response', data => {
    if(data.result) {
      console.log("The Current Color is now " + data.theNextColor);
        let color = document.getElementById("discard-pile-id");
        color.setAttribute("class", "discard-pile-"+ data.theNextColor.toLowerCase());
        socket.emit('get is it my turn', {gameid : game_id});
    }
    else {

    }
  });

  function updateDiscardDeck(currentTopCard) {
    let img = document.getElementById("discard-pile-id");
    let link = "images/uno_cards/small/" + currentTopCard.image;
    img.setAttribute("src",link);
    img.setAttribute("class", "discard-pile");
  }

  function cardClickHandler(events) {

    target_id = events.target.id;
    console.log ("TARGET " + target_id);
    let highlight = document.getElementById(target_id);
    highlight.classList.add("gamecard-highlight");

    events.preventDefault();
    let user_info = {
       gameid : game_id,
       cardIndex : target_id
    }

    socket.emit('play card', user_info);
 }

  function colorClickHandler(color) {
    console.log("Clicked on " + color);

    socket.emit('chose color', {gameid : game_id, chosenColor : color});
    hideWildCardColor();
  }

  function unoClickHandler(player) {
    console.log(player + "clicked on Uno Button")
    //socket.emit('')
    hideUnoButton();
  }

  function updateUserDeck(currentHand) {
    let count = 0;
    let playerHand = document.getElementById("playerHand");
    while (playerHand.firstChild) {
      playerHand.removeChild(playerHand.firstChild);
    }

    for(let card of currentHand){
      let link = "images/uno_cards/small/"+card.image;
      let node = document.createElement('img');
      node.setAttribute("src",link);
      node.setAttribute("alt","inn_logo");
      node.setAttribute("class","gamecard");
      node.setAttribute("id", count++);
      node.onclick = cardClickHandler;
      playerHand.appendChild(node);
    }
  }

  function displayWildCardColor(){
    let wildCardColor = document.getElementById("wild-card-color");
    wildCardColor.classList.remove("show-wild-card-color");
    let blur = document.getElementById("waitScreenBlur");
    blur.classList.add("wait-screen-blur");
  }

  function hideWildCardColor(){
    let wildCardColor = document.getElementById("wild-card-color");
    wildCardColor.classList.add("show-wild-card-color");
    let blur = document.getElementById("waitScreenBlur");
    blur.classList.remove("wait-screen-blur");
  }

  function unHighlight(){
      let highlight = document.getElementById(target_id);
      highlight.classList.remove("gamecard-highlight");
  }

  function displayUnoButton(user){
      let unoPlayerName = document.getElementById("unoPlayerName");
      unoPlayerName.classList.remove("show-uno-player-name");
      unoPlayerName.innerHTML = user + "Has Uno";
  }
  function hideUnoButton(){
      let unoPlayerName = document.getElementById("unoPlayerName");
      unoPlayerName.classList.add("show-uno-player-name");

  }
})();




