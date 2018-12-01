'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('allCards', [
            { id: 0, number: 0,color: 'Red'},
            { id: 1, number: 1,color: 'Red'},
            { id: 2, number: 2,color: 'Red'},
            { id: 3, number: 3,color: 'Red'},
            { id: 4, number: 4,color: 'Red'},
            { id: 5, number: 5,color: 'Red'},
            { id: 6, number: 6,color: 'Red'},
            { id: 7, number: 7,color: 'Red'},
            { id: 8, number: 8,color: 'Red'},
            { id: 9, number: 9,color: 'Red'},
      { id: 10, number: 10,color: 'Red'}, //skip
      { id: 11, number: 11,color: 'Red'}, //reverse
      { id: 12, number: 12,color: 'Red'}, //+2
      //green
      { id: 13, number: 0,color: 'Green'},
      { id: 14, number: 1,color: 'Green'},
      { id: 15, number: 2,color: 'Green'},
      { id: 16, number: 3,color: 'Green'},
      { id: 17, number: 4,color: 'Green'},
      { id: 18, number: 5,color: 'Green'},
      { id: 19, number: 6,color: 'Green'},
      { id: 20, number: 7,color: 'Green'},
      { id: 21, number: 8,color: 'Green'},
      { id: 22, number: 9,color: 'Green'},
      { id: 23, number: 10,color: 'Green'}, //skip
      { id: 24, number: 11,color: 'Green'}, //reverse
      { id: 25, number: 12,color: 'Green'}, //+2
      //blue
      { id: 26, number: 0,color: 'Blue'},
      { id: 27, number: 1,color: 'Blue'},
      { id: 28, number: 2,color: 'Blue'},
      { id: 29, number: 3,color: 'Blue'},
      { id: 30, number: 4,color: 'Blue'},
      { id: 31, number: 5,color: 'Blue'},
      { id: 32, number: 6,color: 'Blue'},
      { id: 33, number: 7,color: 'Blue'},
      { id: 34, number: 8,color: 'Blue'},
      { id: 35, number: 9,color: 'Blue'},
      { id: 36, number: 10,color: 'Blue'}, //skip
      { id: 37, number: 11,color: 'Blue'}, //reverse
      { id: 38, number: 12,color: 'Blue'}, //+2
      //Yellow
      { id: 39, number: 0,color: 'Yellow'},
      { id: 40, number: 1,color: 'Yellow'},
      { id: 41, number: 2,color: 'Yellow'},
      { id: 42, number: 3,color: 'Yellow'},
      { id: 43, number: 4,color: 'Yellow'},
      { id: 44, number: 5,color: 'Yellow'},
      { id: 45, number: 6,color: 'Yellow'},
      { id: 46, number: 7,color: 'Yellow'},
      { id: 47, number: 8,color: 'Yellow'},
      { id: 48, number: 9,color: 'Yellow'},
      { id: 49, number: 10,color: 'Yellow'}, //skip
      { id: 50, number: 11,color: 'Yellow'}, //reverse
      { id: 51, number: 12,color: 'Yellow'}, //+2
      //Black
      { id: 100, number: 0,color: 'Black'}, //wild
      { id: 150, number: 1,color: 'Black'}  //+4
      ])
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('allCards', null, {});
  }
};
