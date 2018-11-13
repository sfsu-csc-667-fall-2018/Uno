const pgp = require('pg-promise')();

const db = pgp('postgres://pablo@localhost:5433/test_db?ssl=true');

module.exports = db;