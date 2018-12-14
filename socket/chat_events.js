const utilities = require('./utilities.js');

const chat_events = (io, socket, users) => {

    let username = users[utilities.getUserId(socket)];
    socket.on('chat message', (message,users) => {
        console.log("NEW MESSAGE"+JSON.stringify(message));
        io.sockets.emit('chat message', {message : message.message, username : username.username});
    })
}
module.exports = chat_events;

