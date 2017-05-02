'use strict';

const Bluebird = require('bluebird');

const Config = require('../config');
const S3     = require('../src/libraries/s3Helper').S3;

exports.deleteS3Object = (key) => {
  return new Bluebird((resolve, reject) => {
    S3.deleteObject({
      Bucket: Config.AWS_ASSET_BUCKET,
      Key: key
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
