import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'face-recognition',
  },
});

export default db;
