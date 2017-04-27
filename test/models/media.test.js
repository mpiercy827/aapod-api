'use strict';

const Knex = require('../../db').knex;

const Media = require('../../src/models/media').Media;

describe('media model', () => {

  describe('serialize', () => {

    it('should serialize an address properly', () => {
      let media = Media.forge({
        id: 'id',
        date: 'date',
        type: 'type',
        url: 'url',
        title: 'title',
        copyright: 'copyright',
        description: 'description'
      });

      expect(media.serialize()).to.eql({
        id: 'id',
        date: 'date',
        type: 'type',
        url: 'url',
        title: 'title',
        copyright: 'copyright',
        description: 'description'
      });
    });

  });

});
