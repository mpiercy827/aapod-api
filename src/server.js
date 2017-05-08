'use strict';

const Hapi = require('hapi');

const Config = require('../config');

const server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true
    }
  }
});

server.connection({ port: Config.PORT });

server.register([
  require('hapi-bookshelf-serializer'),
  require('inject-then'),
  require('./plugins/features/media')
], (err) => {
  /* istanbul ignore next */
  if (err) {
    throw err;
  }
});

module.exports = server;
