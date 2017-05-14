'use strict';

exports.up = function(Knex, Promise) {
  return Knex.raw(`ALTER TABLE media
    ALTER COLUMN copyright SET DATA TYPE text,
    ALTER COLUMN title SET DATA TYPE text,
    ALTER COLUMN url SET DATA TYPE text;
  `);
};

exports.down = function(Knex, Promise) {
  return Knex.raw(`ALTER TABLE media
    ALTER COLUMN copyright SET DATA TYPE varchar(100),
    ALTER COLUMN title SET DATA TYPE varchar(100),
    ALTER COLUMN url SET DATA TYPE varchar(200);
  `);
};
