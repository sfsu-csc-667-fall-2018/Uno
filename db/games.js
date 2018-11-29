const db = require('./index');

const CREATE_QUERY =
'INSERT INTO games (name) VALUES (${name}) RETURNING id';
const create = name =>
db
.one(CREATE_QUERY, { name })
.then(({ name }) => ({
  name
}));

const DELETE_QUERY =
'DELETE FROM games WHERE name = (${name})';
const delete = name =>
db
.one(DELETE_QUERY, { name })
.then(({ name }) => ({
  name
}));

module.exports = {
  create,
  delete
};