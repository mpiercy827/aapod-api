'use strict';

const Sinon = require('sinon');
const Bluebird = require('bluebird');

const Download = require('../../src/libraries/download');
const DBSeeder = require('../../src/libraries/dbSeeder');

describe('DBSeeder', () => {

  describe('seed', () => {

    it('seeds the database with all APOD media', () => {
      const downloadStub = Sinon.stub(Download, 'download').returns(Bluebird.resolve({}));

      return DBSeeder.seed()
      .then(() => {
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

