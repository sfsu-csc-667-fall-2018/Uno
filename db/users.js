const db = require('./index');

const DELETE_QUERY = 'DELETE FROM users WHERE username = (${username})';
const deleteUser = username =>
db
.one(DELETE_QUERY, { username })
.then();

const CREATE_QUERY = 'INSERT INTO users (username) VALUES (${username}) RETURNING id';
const createUser = username =>
db
.one(CREATE_QUERY, { username })
.then();

const ADDUSERTOGAME_QUERY = 'INSERT INTO games_users (user_id,game_id) VALUES (${userid},${gameid})';
const addUserToGame = (userid,gameid) =>
db
.one(ADDUSERTOGAME_QUERY, { userid , gameid})
.then();

const LIST_QUERY = 'SELECT * FROM users';
const listUsers = () => db.any(LIST_QUERY);

const LISTGAMESUSERS_QUERY = 'SELECT * FROM games_users';
const listGamesUsers = () => db.any(LISTGAMESUSERS_QUERY);

module.exports = {
   createUser,
   deleteUser,
   listUsers,
   addUserToGame,
   listGamesUsers
};