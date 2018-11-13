const db = require('./index');

const CREATE_QUERY =
'INSERT INTO games (name) VALUES (${name}) RETURNING id';

const create = creatorId =>
db
.one(CREATE_QUERY, { name });

module.exports = {
  create
};