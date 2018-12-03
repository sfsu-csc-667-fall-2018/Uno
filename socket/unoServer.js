
const unoServer = ( io, socket, db ) => {
  socket.join('uno');
  socket.status = 'Online';
  require('./users.js')(io, socket, db);
};

module.exports = unoServer;
