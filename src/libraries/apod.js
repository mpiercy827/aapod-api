'use strict';

const Config = require('../../config');

const RETRY_MS      = 900000; // 15 minutes
const APOD_URL_BASE = `https://api.nasa.gov/planetary/apod?api_key=${Config.APOD_API_KEY}`;

const request = require('request-promise');

exports.fetch = (date) => {
  let apod_url = APOD_URL_BASE;

  if (typeof date === 'string') {
    apod_url += `&date=${date}`
  }

  return request({uri: apod_url, json: true})
  .catch((err) => {
    /* istanbul ignore next */
    if (err.statusCode == 429) {
      return Bluebird.delay(RETRY_MS)
      .then(() => { return exports.fetch(date); });
    } else {
      throw err;
    }
  });
};
