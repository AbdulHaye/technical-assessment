import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'developer',
    password: process.env.DB_PASSWORD || 'localdev',
    database: process.env.DB_NAME || 'taskdb',
  },
  pool: { min: 2, max: 10 },
});

export { db };