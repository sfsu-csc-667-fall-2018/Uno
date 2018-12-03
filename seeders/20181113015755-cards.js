'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('allCards', [
            { id: 0, number: 0,color: 'Red',image: 'red_0.png'},
            { id: 1, number: 1,color: 'Red',image: 'red_1.png'},
            { id: 2, number: 2,color: 'Red',image: 'red_2.png'},
            { id: 3, number: 3,color: 'Red',image: 'red_3.png'},
            { id: 4, number: 4,color: 'Red',image: 'red_4.png'},
            { id: 5, number: 5,color: 'Red',image: 'red_5.png'},
            { id: 6, number: 6,color: 'Red',image: 'red_6.png'},
            { id: 7, number: 7,color: 'Red',image: 'red_7.png'},
            { id: 8, number: 8,color: 'Red',image: 'red_8.png'},
            { id: 9, number: 9,color: 'Red',image: 'red_9.png'},
      { id: 10, number: 10,color: 'Red',image: 'red_skip.png'}, //skip
      { id: 11, number: 11,color: 'Red',image: 'red_reverse.png'}, //reverse
      { id: 12, number: 12,color: 'Red',image: 'red_picker.png'}, //+2
      { id: 13, number: 0,color: 'Green',image: 'green_0.png'},
      { id: 14, number: 1,color: 'Green',image: 'green_1.png'},
      { id: 15, number: 2,color: 'Green',image: 'green_2.png'},
      { id: 16, number: 3,color: 'Green',image: 'green_3.png'},
      { id: 17, number: 4,color: 'Green',image: 'green_4.png'},
      { id: 18, number: 5,color: 'Green',image: 'green_5.png'},
      { id: 19, number: 6,color: 'Green',image: 'green_6.png'},
      { id: 20, number: 7,color: 'Green',image: 'green_7.png'},
      { id: 21, number: 8,color: 'Green',image: 'green_8.png'},
      { id: 22, number: 9,color: 'Green',image: 'green_9.png'},
      { id: 23, number: 10,color: 'Green',image: 'green_skip.png'}, //skip
      { id: 24, number: 11,color: 'Green',image: 'green_reverse.png'}, //reverse
      { id: 25, number: 12,color: 'Green',image: 'green_picker.png'}, //+2
      { id: 26, number: 0,color: 'Blue',image: 'blue_0.png'},
      { id: 27, number: 1,color: 'Blue',image: 'blue_1.png'},
      { id: 28, number: 2,color: 'Blue',image: 'blue_2.png'},
      { id: 29, number: 3,color: 'Blue',image: 'blue_3.png'},
      { id: 30, number: 4,color: 'Blue',image: 'blue_4.png'},
      { id: 31, number: 5,color: 'Blue',image: 'blue_5.png'},
      { id: 32, number: 6,color: 'Blue',image: 'blue_6.png'},
      { id: 33, number: 7,color: 'Blue',image: 'blue_7.png'},
      { id: 34, number: 8,color: 'Blue',image: 'blue_8.png'},
      { id: 35, number: 9,color: 'Blue',image: 'blue_9.png'},
      { id: 36, number: 10,color: 'Blue',image: 'blue_skip.png'}, //skip
      { id: 37, number: 11,color: 'Blue',image: 'blue_reverse.png'}, //reverse
      { id: 38, number: 12,color: 'Blue',image: 'blue_picker.png'}, //+2
      { id: 39, number: 0,color: 'Yellow',image: 'yellow_0.png'},
      { id: 40, number: 1,color: 'Yellow',image: 'yellow_1.png'},
      { id: 41, number: 2,color: 'Yellow',image: 'yellow_2.png'},
      { id: 42, number: 3,color: 'Yellow',image: 'yellow_3.png'},
      { id: 43, number: 4,color: 'Yellow',image: 'yellow_4.png'},
      { id: 44, number: 5,color: 'Yellow',image: 'yellow_5.png'},
      { id: 45, number: 6,color: 'Yellow',image: 'yellow_6.png'},
      { id: 46, number: 7,color: 'Yellow',image: 'yellow_7.png'},
      { id: 47, number: 8,color: 'Yellow',image: 'yellow_8.png'},
      { id: 48, number: 9,color: 'Yellow',image: 'yellow_9.png'},
      { id: 49, number: 10,color: 'Yellow',image: 'yellow_skip.png'}, //skip
      { id: 50, number: 11,color: 'Yellow',image: 'yellow_reverse.png'}, //reverse
      { id: 51, number: 12,color: 'Yellow',image: 'yellow_picker.png'}, //+2
      { id: 100, number: 0,color: 'Black'}, //wild
      { id: 150, number: 1,color: 'Black'}  //+4
      ])
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('allCards', null, {});
  }
};
