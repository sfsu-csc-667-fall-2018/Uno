
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Cards').del()
  .then(function () {
      // Inserts seed entries
      return knex('Cards').insert([
        { Number: 1,Color: 'Red'},
        { Number: 2,Color: 'Red'},
        { Number: 3,Color: 'Red'},
        { Number: 4,Color: 'Red'},
        { Number: 5,Color: 'Red'},
        { Number: 6,Color: 'Red'},
        { Number: 7,Color: 'Red'},
        { Number: 8,Color: 'Red'},
        { Number: 9,Color: 'Red'},
        { Number: 1,Color: 'Yellow'},
        { Number: 2,Color: 'Yellow'},
        { Number: 3,Color: 'Yellow'},
        { Number: 4,Color: 'Yellow'},
        { Number: 5,Color: 'Yellow'},
        { Number: 6,Color: 'Yellow'},
        { Number: 7,Color: 'Yellow'},
        { Number: 8,Color: 'Yellow'},
        { Number: 9,Color: 'Yellow'},
        { Number: 1,Color: 'Green'},
        { Number: 2,Color: 'Green'},
        { Number: 3,Color: 'Green'},
        { Number: 4,Color: 'Green'},
        { Number: 5,Color: 'Green'},
        { Number: 6,Color: 'Green'},
        { Number: 7,Color: 'Green'},
        { Number: 8,Color: 'Green'},
        { Number: 9,Color: 'Green'},
        { Number: 1,Color: 'Blue'},
        { Number: 2,Color: 'Blue'},
        { Number: 3,Color: 'Blue'},
        { Number: 4,Color: 'Blue'},
        { Number: 5,Color: 'Blue'},
        { Number: 6,Color: 'Blue'},
        { Number: 7,Color: 'Blue'},
        { Number: 8,Color: 'Blue'},
        { Number: 9,Color: 'Blue'},
        ]);
    });
};
