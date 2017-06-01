'use strict';

const Fs       = require('fs');
const Temp     = require('temp');
const Bluebird = require('bluebird');
const Request  = require('request');
const Rimraf   = Bluebird.promisify(require('rimraf'));

const Media = require('../models/media').Media;

const APOD     = require('./apod');
const S3Helper = require('./s3Helper');

const URL_BASE = 'https://s3-us-west-2.amazonaws.com/';

exports.download = (date) => {
  return APOD.fetch(date)
  .then((response) => {
    return new Media({date: response.date}).fetch()
    .then((media) => {
      return media ? {} : response;
    });
  })
  .then((response) => {
    if (response.media_type === 'image') {
      return exports.saveImageMedia(response);
    } else if (response.media_type === 'video') {
      return exports.saveVideoMedia(response);
    }
  })
  .catch((err) => {
    /* istanbul ignore next */
    console.log(`Failed to download media for ${date}`);
  });
};

exports.saveImageMedia = (apodData) => {
  const dateToBucketKey = (date, url) => {
    const fileExtension   = url.split('.').pop();
    const dateWithSlashes = date.replace(new RegExp('-', 'g'), '/');

    return `${dateWithSlashes}.${fileExtension}`;
  };

  const downloadToTempFile = (url) => {
    const tempPath = Temp.path({ dir: '/tmp' });

    const writeStream = Fs.createWriteStream(tempPath);

    return new Bluebird((resolve, reject) => {
      Request(url)
      .on('error', (err) => {
        /* istanbul ignore next */
        reject(err);
      })
      .pipe(writeStream);

      writeStream.on('finish', () => {
        resolve(tempPath);
      });
    });
  };

  let attributes = {
    date: apodData.date,
    type: apodData.media_type,
    title: apodData.title,
    copyright: apodData.copyright,
    description: apodData.explanation
  };

  const bucketKey = dateToBucketKey(apodData.date, apodData.url);

  let filePath;

  return downloadToTempFile(apodData.url)
  .then((tempPath) => {
    filePath = tempPath;
    return S3Helper.uploadToS3(bucketKey, tempPath);
  })
  .then((response) => {
    attributes.url = `${URL_BASE}${response.Bucket}/${response.Key}`;
    return new Media(attributes).save();
  })
  .catch((err) => {
    /* istanbul ignore next */
    throw err;
  })
  .finally(() => {
    return Rimraf(filePath);
  });
};

exports.saveVideoMedia = (apodData) => {
  return new Media({
    url: apodData.url,
    date: apodData.date,
    type: apodData.media_type,
    title: apodData.title,
    description: apodData.explanation
  })
  .save()
  .catch((err) => {
    /* istanbul ignore next */
    throw err;
  });
};
