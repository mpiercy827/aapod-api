'use strict';

const Bluebird = require('bluebird');

const Download = require('./download');

const FIRST_APOD_DATE = new Date('1995-06-16');

exports.seed = () => {
  const pad = (string) => {
    if (string.length == 2) {
      return string;
    } else {
      return '0' + string;
    }
  };

  const formatDay = (date) => {
    const dateString = date.getDate().toString();

    return pad(dateString);
  };

  const formatMonth = (date) => {
    const month = 1 + date.getMonth();
    const monthString = month.toString();

    return pad(monthString);
  };

  const formatYear = (date) => {
    const year = 1900 + date.getYear();

    return year.toString();
  };

  const formatDate = (date) => {
    return formatYear(date) + '-' + formatMonth(date) + '-' + formatDay(date);
  };

  let dates = [];
  let date = new Date();
  let formattedDate;

  while (date >= FIRST_APOD_DATE) {
    formattedDate = formatDate(date);
    dates.push(formattedDate);
    date.setDate(date.getDate() - 1);
  }

  return Bluebird.map(dates, Download.download);
};

