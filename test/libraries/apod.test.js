'use strict';

const APOD = require('../../src/libraries/apod');

const PROPERTIES = ['copyright', 'date', 'explanation', 'hdurl', 'media_type', 'service_version', 'title', 'url'];

describe('APOD', () => {

  describe('fetch', () => {

    it('should return an APOD API response', () => {
      return APOD.fetch()
      .then((response) => {
        expect(response).to.be.an.object;
        expect(response).to.have.all.keys(PROPERTIES);
      });
    });

    it('should return a response for the specified day', () => {
      let date = '2017-04-29';

      return APOD.fetch(date)
      .then((response) => {
        expect(response).to.be.an.object;
        expect(response).to.have.all.keys(PROPERTIES);
        expect(response.date).to.eql(date);
      });
    });

  });

});
