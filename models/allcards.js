'use strict';
module.exports = (sequelize, DataTypes) => {
  const AllCards = sequelize.define('AllCards', {
    id: DataTypes.<i class="icofont icofont-numbered"></i>  ,
    number: DataTypes.INTEGER,
    color: DataTypes.STRING,
    value: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  AllCards.associate = function(models) {
    // associations can be defined here
  };
  return AllCards;
};