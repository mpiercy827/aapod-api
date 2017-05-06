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

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply('Hello World');
  }
});

module.exports = server;
