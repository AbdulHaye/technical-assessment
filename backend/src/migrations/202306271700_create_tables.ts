import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.enum('status', ['pending', 'in_progress', 'completed']).defaultTo('pending');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('task_assignments', (table) => {
    table.increments('id').primary();
    table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('CASCADE');
    table.integer('assigned_user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('task_assignments');
  await knex.schema.dropTable('tasks');
  await knex.schema.dropTable('users');
}