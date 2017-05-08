'use strict';

const Moment = require('moment');

const Knex = require('../../../../db').Knex;

const Controller = require('../../../../src/plugins/features/media/controller');

const DefaultMedia = {
  date: '2017-05-07',
  url: 'https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg',
  type: 'image'
};

describe('Controller', () => {

  beforeEach(() => {
    return Knex('media').truncate()
    .then(() => {
      return Knex('media').insert(DefaultMedia);
    });
  });

  describe('fetch', () => {

    it('fetches media object for a given date', () => {
      return Controller.fetch('2017-05-07')
      .then((media) => {
        const formattedDate = Moment.utc(media.get('date')).format('YYYY-MM-DD');

        expect(media).to.be.an.object;
        expect(formattedDate).to.eql('2017-05-07');
      });
    });

    it('returns null media does not exist for the given date', () => {
      return Controller.fetch('1995-01-01')
      .then((media) => {
        expect(media).to.be.null;
      });
    });

  });

});
