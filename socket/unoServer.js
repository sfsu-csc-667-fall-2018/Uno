let users = {};
let games = {};

const unoServer = ( io, socket ,db ) => {
 socket.join('uno');
 socket.status = 'Online';
 require('./users.js')(io, socket, db, users);
 require('./listofgames.js')(io, socket, db, games,users);
 require('./user_events.js')(io, socket, db,users);
};

module.exports = unoServer;
