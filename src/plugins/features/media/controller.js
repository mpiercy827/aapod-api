'use strict';

const Media = require('../../../models/media').Media;

exports.fetch = (date) => {
  return new Media({ date: date }).fetch();
};
