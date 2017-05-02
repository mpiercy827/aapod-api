'use strict';

const APOD = require('../../src/libraries/apod');

describe('APOD', () => {

  describe('fetch', () => {

    it('should return an APOD API response', () => {
      return APOD.fetch()
      .then((response) => {
        expect(response).to.be.an.object;
        expect(response.date).to.exist;
        expect(response.explanation).to.exist;
        expect(response.media_type).to.exist;
        expect(response.service_version).to.exist;
        expect(response.title).to.exist;
        expect(response.url).to.exist;
      });
    });

    it('should return a response for the specified day', () => {
      let date = '2017-04-29';

      return APOD.fetch(date)
      .then((response) => {
        expect(response).to.be.an.object;
        expect(response.date).to.exist;
        expect(response.date).to.eql(date);
        expect(response.explanation).to.exist;
        expect(response.media_type).to.exist;
        expect(response.service_version).to.exist;
        expect(response.title).to.exist;
        expect(response.url).to.exist;
        expect(response.hdurl).to.exist;
        expect(response.copyright).to.exist;
      });
    });

  });

});
