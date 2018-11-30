const db = require('./index');

const DELETE_QUERY = 'DELETE FROM games WHERE name = (${name})';
const deleteGame = name =>
db
.one(DELETE_QUERY, { name })
.then(({ name }) => ({
 name
}));

const CREATE_QUERY = 'INSERT INTO games (name) VALUES (${name}) RETURNING id';
const createGame = name =>
db
.one(CREATE_QUERY, { name })
.then(({ id }) => ({
 name
}));

const LIST_QUERY = 'SELECT * FROM games';
const listGames = () => db.any(LIST_QUERY);

module.exports = {
  createGame,
  deleteGame,
  listGames
};