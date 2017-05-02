'use strict';

const DbConfig = require('./config');
const Knex     = require('knex')(DbConfig);
const Db       = require('bookshelf')(Knex);

exports.db   = Db;
exports.Knex = Knex;
