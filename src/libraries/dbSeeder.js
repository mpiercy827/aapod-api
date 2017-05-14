'use strict';

const Bluebird = require('bluebird');
const Moment   = require('moment');

const Download = require('./download');

const Media = require('../models/media').Media;

const FIRST_APOD_DATE = Moment.utc('1995-06-16');

exports.seed = () => {
  let dates = [];
  let date = Moment.utc();
  let formattedDate;

  while (date >= FIRST_APOD_DATE) {
    formattedDate = date.format('YYYY-MM-DD');
    dates.push(formattedDate);
    date.subtract(1, 'days');
  }

  return Bluebird.each(dates, (date) => {
    return new Media({ date: date }).fetch()
    .then((media) => {
      if (!media) {
        return Download.download(date);
      }
    });
  });
};

