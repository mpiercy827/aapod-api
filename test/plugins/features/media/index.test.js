'use strict';

const Sinon = require('sinon');

const Knex       = require('../../../../db').Knex;
const Server     = require('../../../../src/server.js');
const Controller = require('../../../../src/plugins/features/media/controller');

const DefaultMedia = {
  date: '2017-05-07',
  url: 'https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg',
  type: 'image'
};

describe('Media integration', () => {

  beforeEach(() => {
    return Knex('media').truncate()
    .then(() => {
      return Knex('media').insert(DefaultMedia);
    });
  });

  describe('retrieve', () => {

    it('fetches a serialized media model for the given day', () => {
      return Server.injectThen({
        url: '/media/2017-05-07',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.url).to.eql(DefaultMedia.url);
        expect(response.result.type).to.eql(DefaultMedia.type);
        expect(response.result.date).to.eql(DefaultMedia.date);
      });
    });

    it('fetches the latest media object', () => {
      Sinon.spy(Controller, 'fetchLatest');

      return Server.injectThen({
        url: '/media/latest',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(Controller.fetchLatest).to.have.been.calledOnce;
      })
      .finally(() => {
        return Controller.fetchLatest.restore();
      });
    });

  });

});
