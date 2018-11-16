const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const sequelize_db = {};

sequelize_db.Sequelize = Sequelize;
sequelize_db.sequelize = sequelize;

sequelize_db.user = require('../models/users')(sequelize, Sequelize);

module.exports = sequelize_db;