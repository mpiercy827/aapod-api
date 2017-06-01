'use strict';

const Media = require('../../../models/media').Media;

exports.fetchLatest = () => {
  return new Media().query((qb) => {
    qb.orderBy('date', 'desc');
    qb.limit(1);
  })
  .fetch();
};

exports.fetch = (date) => {
  return new Media({ date: date }).fetch();
};
