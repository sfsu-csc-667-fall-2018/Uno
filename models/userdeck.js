'use strict';
module.exports = (sequelize, DataTypes) => {
  const userDeck = sequelize.define('userDeck', {
    gameid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    cardid: DataTypes.INTEGER
  }, {});
  userDeck.associate = function (models) {
    // associations can be defined here
  };
  return userDeck;
};