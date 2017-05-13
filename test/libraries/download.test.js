'use strict';

const Sinon = require('sinon');
const Bluebird = require('bluebird');

const Config   = require('../../config');
const Knex     = require('../../db').Knex;
const Download = require('../../src/libraries/download');
const S3Helper = require('../../src/libraries/s3Helper');

const URL_BASE  = 'https://s3-us-west-2.amazonaws.com/';
const IMAGE_URL = 'https://apod.nasa.gov/apod/image/1704/SaturnInsideOut2_cassini_960.jpg';

describe('Downlaod', () => {

  beforeEach(() => {
    return Knex('media').truncate();
  });

  describe('download', () => {

    it('creates an image Media model for the given date', () => {
      const key = '2017/04/30.jpg';

      const s3Stub = Sinon.stub(S3Helper, 'uploadToS3')
        .returns(Bluebird.resolve({Bucket: Config.AWS_ASSET_BUCKET, Key: key}));

      return Download.download('2017-04-30')
      .then((media) => {
        expect(media).to.be.an.object;
        expect(media.get('date')).to.eql('2017-04-30');
        expect(media.get('url')).to.eql(`${URL_BASE}${Config.AWS_ASSET_BUCKET}/2017/04/30.jpg`);
      })
      .finally(() => {
        return S3Helper.uploadToS3.restore();
      });
    });

    it('creates a video Media model for the given date', () => {
      return Download.download('2016-05-11')
      .then((media) => {
        expect(media).to.be.an.object;
        expect(media.get('type')).to.eql('video');
        expect(media.get('date')).to.eql('2016-05-11');
      });
    });

  });

});
