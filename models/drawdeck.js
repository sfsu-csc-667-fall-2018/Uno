'use strict';
module.exports = (sequelize, DataTypes) => {
 const drawDeck = sequelize.define('drawDeck', {
  gameid: DataTypes.INTEGER,
  cardid: DataTypes.INTEGER,
  index: DataTypes.INTEGER
}, {});
 drawDeck.associate = function(models) {
    // associations can be defined here
 };
 return drawDeck;
};