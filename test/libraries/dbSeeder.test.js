'use strict';

const Sinon = require('sinon');
const Bluebird = require('bluebird');

const Knex     = require('../../db').Knex;
const Download = require('../../src/libraries/download');
const DBSeeder = require('../../src/libraries/dbSeeder');

const DefaultMedia = {
  date: '2017-05-07',
  url: 'https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg',
  type: 'image'
};

describe('DBSeeder', () => {

  beforeEach(() => {
    return Knex('media').truncate()
    .then(() => {
      return Knex('media').insert(DefaultMedia);
    });
  });

  describe('seed', () => {

    it('seeds the database with all APOD media, unless already present', () => {
      const downloadStub = Sinon.stub(Download, 'download').returns(Bluebird.resolve({}));

      return DBSeeder.seed()
      .then(() => {
        expect(downloadStub).to.not.have.been.calledWith('2017-05-07');
        expect(downloadStub).to.have.been.calledWith('2017-05-03');
        expect(downloadStub).to.have.been.calledWith('1995-06-20');
        expect(downloadStub).to.have.been.calledWith('1995-06-16');
        expect(downloadStub).to.not.have.been.calledWith('1995-06-15');
      })
      .finally(() => {
        return Download.download.restore();
      });
    });

  });

});

