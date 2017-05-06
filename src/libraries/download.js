'use strict';

const Media = require('../models/media').Media;

const APOD     = require('./apod');
const S3Helper = require('./s3Helper');

const URL_BASE = 'https://s3-us-west-2.amazonaws.com/';

exports.download = (date) => {
  return APOD.fetch(date)
  .then((response) => {
    if (response.media_type === 'image') {
      return exports.saveImageMedia(response);
    } else {
      return exports.saveVideoMedia(response);
    }
  });
};

exports.saveImageMedia = (apodData) => {
  const dateToBucketKey = (date, url) => {
    const fileExtension   = url.split('.').pop();
    const dateWithSlashes = date.replace(new RegExp('-', 'g'), '/');

    return `${dateWithSlashes}.${fileExtension}`;
  };

  let attributes = {
    date: apodData.date,
    type: apodData.media_type,
    title: apodData.title,
    copyright: apodData.copyright,
    description: apodData.explanation
  };

  const bucketKey = dateToBucketKey(apodData.date, apodData.url);

  return S3Helper.uploadToS3(bucketKey, apodData.url)
  .then((s3Response) => {
    attributes.url = `${URL_BASE}${s3Response.Bucket}/${s3Response.Key}`;
    return new Media(attributes).save();
  })
  .catch((err) => {
    /* istanbul ignore next */
    throw err;
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
