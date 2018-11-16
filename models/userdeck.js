'use strict';
module.exports = (sequelize, DataTypes) => {
  const userDeck = sequelize.define('userDeck', {
    gameid: DataTypes.NUMBER,
    userid: DataTypes.NUMBER,
    cardid: DataTypes.NUMBER
  }, {});
  userDeck.associate = function(models) {
    // associations can be defined here
  };
  return userDeck;
};