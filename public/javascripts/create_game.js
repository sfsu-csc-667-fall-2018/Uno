const socket = io.connect();
(() => {

   $('#create-game').on('submit', event => {
      console.log("clicked on create game ===============");
      event.preventDefault();
      let e = document.getElementById("numberofplayers");
      let strUser = e.options[e.selectedIndex].value;
      let gameInfo = {'name':$('#roomname').val(),'number':strUser};
      socket.emit('create game request',gameInfo);
   });

   socket.on('create game response', data => {
      console.log('========================== response from create game')
      console.log(data)
   });
})();