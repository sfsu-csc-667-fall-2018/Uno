const pgp = require('pg-promise')();
const connection = process.env.DATABASE_URL;
const db = pgp(connection);

module.exports = db;