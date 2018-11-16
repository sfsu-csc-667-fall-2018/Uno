'use strict';
module.exports = (sequelize, DataTypes) => {
  const AllCards = sequelize.define('AllCards', {
    id: DataTypes.NUMBER,
    number: DataTypes.NUMBER,
    color: DataTypes.STRING,
    value: DataTypes.NUMBER,
    image: DataTypes.STRING
  }, {});
  AllCards.associate = function(models) {
    // associations can be defined here
  };
  return AllCards;
};