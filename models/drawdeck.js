'use strict';
module.exports = (sequelize, DataTypes) => {
  const drawDeck = sequelize.define('drawDeck', {
    gameid: DataTypes.NUMBER,
    cardid: DataTypes.NUMBER,
    index: DataTypes.NUMBER
  }, {});
  drawDeck.associate = function(models) {
    // associations can be defined here
  };
  return drawDeck;
};