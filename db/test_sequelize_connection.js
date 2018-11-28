const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const sequelize_db = {};

sequelize_db.Sequelize = Sequelize;
sequelize_db.sequelize = sequelize;

module.exports = sequelize_db;