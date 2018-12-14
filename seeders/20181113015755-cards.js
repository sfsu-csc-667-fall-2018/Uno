'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('all_cards', [
      { id: 0, type:'NUMBER_CARD', number: 0,color: 'RED',value: 0,image: 'red_0.png'},
      { id: 1, type:'NUMBER_CARD',number: 1,color: 'RED',value: 1,image: 'red_1.png'},
      { id: 2, type:'NUMBER_CARD',number: 2,color: 'RED',value: 2,image: 'red_2.png'},
      { id: 3, type:'NUMBER_CARD',number: 3,color: 'RED',value: 3,image: 'red_3.png'},
      { id: 4, type:'NUMBER_CARD',number: 4,color: 'RED',value: 4,image: 'red_4.png'},
      { id: 5, type:'NUMBER_CARD',number: 5,color: 'RED',value: 5,image: 'red_5.png'},
      { id: 6, type:'NUMBER_CARD',number: 6,color: 'RED',value: 6,image: 'red_6.png'},
      { id: 7, type:'NUMBER_CARD',number: 7,color: 'RED',value: 7,image: 'red_7.png'},
      { id: 8, type:'NUMBER_CARD',number: 8,color: 'RED',value: 8,image: 'red_8.png'},
      { id: 9, type:'NUMBER_CARD',number: 9,color: 'RED',value: 9,image: 'red_9.png'},
      { id: 10, type:'SKIP_CARD',number: 10,color: 'RED',value: 20,image: 'red_skip.png'}, //skip
      { id: 11, type:'REVERSE_CARD',number: 11,color: 'RED',value: 20,image: 'red_reverse.png'}, //reverse
      { id: 12, type:'DRAW_TWO_CARD',number: 12,color: 'RED',value: 20,image: 'red_picker.png'}, //+2
      { id: 13, type:'NUMBER_CARD',number: 0,color: 'GREEN',value: 0,image: 'green_0.png'},
      { id: 14, type:'NUMBER_CARD',number: 1,color: 'GREEN',value: 1,image: 'green_1.png'},
      { id: 15, type:'NUMBER_CARD',number: 2,color: 'GREEN',value: 2,image: 'green_2.png'},
      { id: 16, type:'NUMBER_CARD',number: 3,color: 'GREEN',value: 3,image: 'green_3.png'},
      { id: 17, type:'NUMBER_CARD',number: 4,color: 'GREEN',value: 4,image: 'green_4.png'},
      { id: 18, type:'NUMBER_CARD',number: 5,color: 'GREEN',value: 5,image: 'green_5.png'},
      { id: 19, type:'NUMBER_CARD',number: 6,color: 'GREEN',value: 6,image: 'green_6.png'},
      { id: 20, type:'NUMBER_CARD',number: 7,color: 'GREEN',value: 7,image: 'green_7.png'},
      { id: 21, type:'NUMBER_CARD',number: 8,color: 'GREEN',value: 8,image: 'green_8.png'},
      { id: 22, type:'NUMBER_CARD',number: 9,color: 'GREEN',value: 9,image: 'green_9.png'},
      { id: 23, type:'SKIP_CARD',number: 10,color: 'GREEN',value: 20,image: 'green_skip.png'}, //skip
      { id: 24, type:'REVERSE_CARD',number: 11,color: 'GREEN',value: 20,image: 'green_reverse.png'}, //reverse
      { id: 25, type:'DRAW_TWO_CARD',number: 12,color: 'GREEN',value: 20,image: 'green_picker.png'}, //+2
      { id: 26, type:'NUMBER_CARD',number: 0,color: 'BLUE',value: 0,image: 'blue_0.png'},
      { id: 27, type:'NUMBER_CARD',number: 1,color: 'BLUE',value: 1,image: 'blue_1.png'},
      { id: 28, type:'NUMBER_CARD',number: 2,color: 'BLUE',value: 2,image: 'blue_2.png'},
      { id: 29, type:'NUMBER_CARD',number: 3,color: 'BLUE',value: 3,image: 'blue_3.png'},
      { id: 30, type:'NUMBER_CARD',number: 4,color: 'BLUE',value: 4,image: 'blue_4.png'},
      { id: 31, type:'NUMBER_CARD',number: 5,color: 'BLUE',value: 5,image: 'blue_5.png'},
      { id: 32, type:'NUMBER_CARD',number: 6,color: 'BLUE',value: 6,image: 'blue_6.png'},
      { id: 33, type:'NUMBER_CARD',number: 7,color: 'BLUE',value: 7,image: 'blue_7.png'},
      { id: 34, type:'NUMBER_CARD',number: 8,color: 'BLUE',value: 8,image: 'blue_8.png'},
      { id: 35, type:'NUMBER_CARD',number: 9,color: 'BLUE',value: 9,image: 'blue_9.png'},
      { id: 36, type:'SKIP_CARD',number: 10,color: 'BLUE',value: 20,image: 'blue_skip.png'}, //skip
      { id: 37, type:'REVERSE_CARD',number: 11,color: 'BLUE',value: 20,image: 'blue_reverse.png'}, //reverse
      { id: 38, type:'DRAW_TWO_CARD',number: 12,color: 'BLUE',value: 20,image: 'blue_picker.png'}, //+2
      { id: 39, type:'NUMBER_CARD',number: 0,color: 'YELLOW',value: 0,image: 'yellow_0.png'},
      { id: 40, type:'NUMBER_CARD',number: 1,color: 'YELLOW',value: 1,image: 'yellow_1.png'},
      { id: 41, type:'NUMBER_CARD',number: 2,color: 'YELLOW',value: 2,image: 'yellow_2.png'},
      { id: 42, type:'NUMBER_CARD',number: 3,color: 'YELLOW',value: 3,image: 'yellow_3.png'},
      { id: 43, type:'NUMBER_CARD',number: 4,color: 'YELLOW',value: 4,image: 'yellow_4.png'},
      { id: 44, type:'NUMBER_CARD',number: 5,color: 'YELLOW',value: 5,image: 'yellow_5.png'},
      { id: 45, type:'NUMBER_CARD',number: 6,color: 'YELLOW',value: 6,image: 'yellow_6.png'},
      { id: 46, type:'NUMBER_CARD',number: 7,color: 'YELLOW',value: 7,image: 'yellow_7.png'},
      { id: 47, type:'NUMBER_CARD',number: 8,color: 'YELLOW',value: 8,image: 'yellow_8.png'},
      { id: 48, type:'NUMBER_CARD',number: 9,color: 'YELLOW',value: 9,image: 'yellow_9.png'},
      { id: 49, type:'SKIP_CARD',number: 10,color: 'YELLOW',value: 20,image: 'yellow_skip.png'}, //skip
      { id: 50, type:'REVERSE_CARD',number: 11,color: 'YELLOW',value: 20,image: 'yellow_reverse.png'}, //reverse
      { id: 51, type:'DRAW_TWO_CARD',number: 12,color: 'YELLOW',value: 20,image: 'yellow_picker.png'}, //+2
      { id: 100, type:'WILD_CARD',number: 0,color: 'BLACK',value: 50,image: 'wild_color_changer.png'}, //wild
      { id: 150, type:'WILD_DRAW_FOUR_CARD',number: 1,color: 'BLACK',value: 50,image: 'wild_pick_four.png'}  //+4
      ])
},
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('all_cards', null, {});
}
};
