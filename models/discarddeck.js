'use strict';
module.exports = (sequelize, DataTypes) => {
 const discardDeck = sequelize.define('discardDeck', {
  gameid: DataTypes.INTEGER,
  cardid: DataTypes.INTEGER
}, {});
 discardDeck.associate = function(models) {
    // associations can be defined here
 };
 return discardDeck;
};