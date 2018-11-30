'use strict';
module.exports = (sequelize, DataTypes) => {
 const games_users = sequelize.define('games_users', {
  gameid: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER
}, {});
 games_users.associate = function(models) {
    // associations can be defined here
 };
 return games_users;
};