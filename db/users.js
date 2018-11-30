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

const LIST_QUERY = 'SELECT * FROM users';
const listUsers = () => db.any(LIST_QUERY);

module.exports = {
   createUser,
   deleteUser,
   listUsers
};