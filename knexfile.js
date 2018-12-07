// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://kdfppiqftcwthj:3147abe2e3a9ae7a1a278930842b2ff9f32253f1fefb266f9627a21e2e7d5ceb@ec2-107-20-211-10.compute-1.amazonaws.com:5432/d9rl3b2r0rsijc?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    ssl: true,
    connection: {
      host: 'ec2-107-20-211-10.compute-1.amazonaws.com',
      database: 'd9rl3b2r0rsijc',
      user:     'kdfppiqftcwthj',
      password: '3147abe2e3a9ae7a1a278930842b2ff9f32253f1fefb266f9627a21e2e7d5ceb'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://kdfppiqftcwthj:3147abe2e3a9ae7a1a278930842b2ff9f32253f1fefb266f9627a21e2e7d5ceb@ec2-107-20-211-10.compute-1.amazonaws.com:5432/d9rl3b2r0rsijc?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
