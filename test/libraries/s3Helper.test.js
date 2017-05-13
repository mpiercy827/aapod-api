'use strict';

const Path     = require('path');
const request  = require('request-promise');
const Bluebird = require('bluebird');

const Config = require('../../config');

const S3Helper = require('../../src/libraries/s3Helper');

const Helper = require('../helper');

describe('S3Helper', () => {

  describe('uploadToS3', () => {

    it('uploads a local file to S3', () => {
      return S3Helper.uploadToS3('test.jpg', Path.join(__dirname, '..', '..', 'assets/nasa_logo.jpg'))
      .then((response) => {
        expect(response).to.be.an.object;
        expect(response.ETag).to.exist;
        expect(response.Bucket).to.eql(Config.AWS_ASSET_BUCKET);
        expect(response.Key).to.eql('test.jpg');
      })
      .finally(() => {
        return Helper.deleteS3Object('test.jpg');
      });
    });

    it('fails for a bad file path', () => {
      return S3Helper.uploadToS3('some-bucket-key', 'bad-image-path.png')
      .catch((err) => {
        expect(err.error).to.be.an.object;
        expect(err.file).to.eql('bad-image-path.png');
      });
    });

  });

});
