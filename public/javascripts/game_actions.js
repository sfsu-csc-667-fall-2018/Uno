(() => {

    let isTurn = false;

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

    //Preston and Chris these are the calls to the server
    //We need to wrap these in to functions
    //I left some examples up above
    // socket.emit('get num players', data);
    // socket.emit('get player', data);
    // socket.emit('get player data', data);
    // socket.emit('get play result', data);

    // socket.emit('get other player data', data);
    // socket.emit('get current player points' data);
    // socket.emit('get play', data);


    //These functions are the call backs that the
    //Server will call
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

      if(data.result) {
        if(data.myTurn) {
          console.log("========= MY TURN ============");

            isTurn = true;

            let turn = document.getElementById("player2");
            turn.classList.remove("is-turn");

            // document.getElementById("playerTurn").appendChild(text);
            let text = document.createElement("h1");
            text.innerHTML = "MY TURN";
            turn_message.appendChild(text);

        }
        else {
          console.log("========= NOT MY TURN ============");
            isTurn = false;


            let turn = document.getElementById("player2");
            turn.classList.add("is-turn");

            //let text = document.createElement("div");
            let text = document.createElement("h1");
            text.innerHTML = "NOT MY TURN";
            turn_message.appendChild(text);
        }
      }
      else {
        console.log("========= COULD NOT GET PLAYERS TURN ============");
      }
    });

    socket.on('get play response', data => {
      //Preston and Chris fill in here
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
        console.log("FAILED " + data.message);
      }
    });

    socket.on('play card response', data => {
      console.log("I PLAYED A CARD");
      if(data.result) {
        console.log("SUCCESSSFULLY");
        socket.emit('get is it my turn', {gameid : game_id});
      }
      else {
        console.log("FAILED " + data.message);
      }
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

    function updateDiscardDeck(currentTopCard) {
      //{"TYPE":"REVERSE_CARD","VALUE":20,"COLOR":"BLUE"}
      //<img src="images/uno_cards/small/<%= cards[cards.length-1].image %>" alt="inn_logo" class="discard-pile"/>
      let link = "images/uno_cards/small/"+currentTopCard.image;
      let node = document.createElement('img');
      node.setAttribute("src",link);
      node.setAttribute("alt","inn_logo");
      node.setAttribute("class","discard-pile");
      //node.innerHTML = str;
      //node.onclick = clickHandler;
      document.getElementById("discard-deck").appendChild(node); 
    }

    function cardClickHandler(events) {
      let target_id = events.target.id;
      console.log ("TARGET " + target_id);
      let highlight = document.getElementById(target_id);
      highlight.classList.add("gamecard");
  
      events.preventDefault();
      let user_info = {
         gameid : game_id,
         cardIndex : target_id
      }

      socket.emit('play card', user_info);
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
})();




