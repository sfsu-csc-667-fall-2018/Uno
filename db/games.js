const db = require('./index');

const CREATE_QUERY =
'INSERT INTO games (name) VALUES (${name}) RETURNING id';

const create = name =>
db
.one(CREATE_QUERY, { name })
.then();


module.exports = {
  create
};

