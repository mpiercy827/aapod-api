'use strict';

const config = {
  development: require('./development'),
  production: require('./production'),
  test: require('./test')
};

/* istanbul ignore next */
module.exports = config[process.env.NODE_ENV || 'development'];
