'use strict';
module.exports = (sequelize, DataTypes) => {
  const games_users = sequelize.define('games_users', {
    gameid: DataTypes.NUMBER,
    user_id: DataTypes.NUMBER
  }, {});
  games_users.associate = function(models) {
    // associations can be defined here
  };
  return games_users;
};