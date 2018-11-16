'use strict';
module.exports = (sequelize, DataTypes) => {
  const discardDeck = sequelize.define('discardDeck', {
    gameid: DataTypes.NUMBER,
    cardid: DataTypes.NUMBER
  }, {});
  discardDeck.associate = function(models) {
    // associations can be defined here
  };
  return discardDeck;
};