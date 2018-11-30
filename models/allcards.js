'use strict';
module.exports = (sequelize, DataTypes) => {
  const allCards = sequelize.define('AllCards', {
    number: DataTypes.INTEGER,
    color: DataTypes.STRING,
    value: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  allCards.associate = function(models) {
    // associations can be defined here
  };
  return allCards;
};