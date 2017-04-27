'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('media', (table) => {
    table.integer('id').primary();
    table.date('date').notNullable();
    table.string('url', 200).notNullable();
    table.string('type', 20);
    table.string('title', 100);
    table.string('copyright', 100);
    table.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('media');
};
