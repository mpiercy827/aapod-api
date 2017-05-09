'use strict';

const Controller = require('./controller');

exports.register = (server, options, next) => {

  server.route([{
    method: 'GET',
    path: '/media/{date}',
    config: {
      handler: (request, reply) => {
        return reply(Controller.fetch(request.params.date));
      }
    }
  }]);

  next();
};

exports.register.attributes = {
  name: 'media'
};
