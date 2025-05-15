import knex from 'knex';
import config from './config/config.ts';

const db = knex({
  client: 'pg',
  connection: {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbDatabase,
  },
});

export default db;
