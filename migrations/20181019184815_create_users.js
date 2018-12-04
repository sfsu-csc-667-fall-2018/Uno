exports.up = function up(knex) {
   return Promise.all([
      knex.schema.hasTable('Users').then(exists => {
         if(!exists){
            return knex.schema.createTable('Users', table =>{
               table.string('UserName').unique();
               table.string('email');
               table.jsonb('Password');
            })
         }
      })
      ])

};

exports.down = function down(knex) {
   return knex.schema
   .dropTableIfExists('Users')
};