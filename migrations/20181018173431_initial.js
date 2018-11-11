exports.up = function up(knex) {
  return Promise.all([
    knex.schema.hasTable('Users').then(exists => {
      if(!exists){
        return knex.schema.createTable('Users', table =>{
          table.increments('ID');
          table.string('UserName').unique();
          table.string('Email').unique();
          table.string('Password');
        })
      }
    }),
    knex.schema.hasTable('Games').then(exists => {
      if(!exists){
        return knex.schema.createTable('Games', table =>{
          table.increments('ID');
          table.string('Name');
        })
      }
    }),
    knex.schema.hasTable('Game_Users').then(exists => {
      if(!exists){
        return knex.schema.createTable('Game_Users', table =>{
          table.integer('UserID').unsigned().unique().notNullable()
          .references('ID').inTable('Users');
          table.integer('GameID').unsigned().unique().notNullable()
          .references('ID').inTable('Games');
        })
      }
    }),
    knex.schema.hasTable('Cards').then(exists => {
      if(!exists){
        return knex.schema.createTable('Cards', table =>{
          table.increments('ID');
          table.string('Color');
          table.integer('Number');
          table.string('Image');
        })
      }
    }),
    knex.schema.hasTable('UserDeck').then(exists => {
      if(!exists){
        return knex.schema.createTable('UserDeck', table =>{
          table.integer('GameID').unique().unsigned().notNullable()
          .references('ID').inTable('Games');
          table.integer('CardID').unique().unsigned().notNullable()
          .references('ID').inTable('Cards');
          table.integer('UserID').unique().unsigned().notNullable()
          .references('ID').inTable('Users');
        })
      }
    }),
    knex.schema.hasTable('DrawDeck').then(exists => {
      if(!exists){
        return knex.schema.createTable('DrawDeck', table =>{
          table.integer('GameID').unsigned().notNullable()
          .references('ID').inTable('Games');
          table.integer('CardID').unsigned().notNullable()
          .references('ID').inTable('Cards');
          table.integer('CardIndex');
        })
      }
    }),
    knex.schema.hasTable('DiscardDeck').then(exists => {
      if(!exists){
        return knex.schema.createTable('DiscardDeck', table =>{
          table.integer('GameID').unique().unsigned().notNullable()
          .references('ID').inTable('Games');
          table.integer('CardID').unique().unsigned().notNullable()
          .references('ID').inTable('Cards');
          table.integer('UserID').unique().unsigned().notNullable()
          .references('ID').inTable('Users');
        })
      }
    })
    ])
  .then();
};

exports.down = function down(knex) {
  return knex.schema
  .dropTableIfExists('Game_Users')
  .dropTableIfExists('UserDeck')
  .dropTableIfExists('DiscardDeck')
  .dropTableIfExists('DrawDeck')
  .dropTableIfExists('Games')
  .dropTableIfExists('Users')
  .dropTableIfExists('Cards')
};