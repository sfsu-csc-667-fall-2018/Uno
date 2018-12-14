let users = {};
let games = {};
let connections = {}

const unoServer = ( io, socket ,db ) => {
 socket.join('uno');
 socket.status = 'Online';
 connections[socket.id] = { socket: socket };
 console.log("Connected: " + Object.keys(connections).length);
 require('./users.js')(io, socket, db, users);
 require('./listofgames.js')(io, socket, db, games,users);
 require('./game_session.js')(io, socket, db, users, games);
 require('./chat_events.js')(io, socket, users);
};

module.exports = unoServer;
