const socketIo = require( 'socket.io' )

const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });
}

module.exports = { init }
