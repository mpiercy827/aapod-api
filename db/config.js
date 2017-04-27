'use strict';

const Path = require('path');

const Config = require('../config');

module.exports = {
  client: 'pg',
  connection: {
    host: Config.DATABASE_HOST,
    user: Config.DATABASE_USER,
    password: Config.DATABASE_PASSWORD,
    database: Config.DATABASE_DATABASE
  },
  migrations: {
    tableName: 'migrations',
    directory: Path.join(__dirname, './migrations')
  }
};
