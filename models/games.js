'use strict';
module.exports = (sequelize, DataTypes) => {
   const games = sequelize.define('games', {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING
   }, {});
   games.associate = function (models) {
      // associations can be defined here
   };
   return games;
};