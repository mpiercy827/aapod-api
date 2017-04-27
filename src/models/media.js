'use strict';

const Db   = require('../../db').db;
const Knex = require('../../db').knex;

exports.Media = Db.Model.extend({
  tableName: 'media'
});
