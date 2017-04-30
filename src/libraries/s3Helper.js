'use strict';

const AWS     = require('aws-sdk');
const Promise = require('bluebird');
const request = require('request-promise');

const Config = require('../../config');

exports.S3 = new AWS.S3({
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  params: {
    Bucket: Config.AWS_ASSET_BUCKET
  }
});

exports.uploadToS3 = (key, fileUrl) => {
  return request(fileUrl)
  .then((response) => {
    return new Promise((resolve, reject) => {
      exports.S3.upload({
        Key: key,
        Body: response,
        ACL: 'public-read'
      }, (err, data) => {
        /* istanbul ignore next */
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
  })
  .catch((err) => {
    throw {
      error: err,
      file: fileUrl
    };
  });
};
