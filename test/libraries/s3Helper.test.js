'use strict';

const Path     = require('path');
const Sinon    = require('sinon');
const request  = require('request-promise');
const Bluebird = require('bluebird');

const Config = require('../../config');

const S3Helper = require('../../src/libraries/s3Helper');

const BAD_IMAGE_URL = 'http://www.google.com/bad_image_url.jpg';

describe('S3Helper', () => {

  describe('uploadToS3', () => {

    it('pulls a file from a valid url and uploads it to S3', () => {
      return S3Helper.uploadToS3('test.jpg', Config.S3_TEST_URL)
      .then((response) => {
        expect(response).to.be.an.object;
        expect(response.key).to.eql('test.jpg');
        expect(response.Bucket).to.eql(Config.AWS_ASSET_BUCKET);
      });
    });

    it('fails for a bad file url', () => {
      return S3Helper.uploadToS3('some-bucket-key', 'https://mock.codes/404')
      .catch((err) => {
        expect(err.error).to.be.an.object;
        expect(err.file).to.eql('https://mock.codes/404');
      });
    });

  });

});
