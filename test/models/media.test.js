'use strict';

const Knex = require('../../db').knex;

const Media = require('../../src/models/media').Media;

describe('media model', () => {

  describe('serialize', () => {

    it('should serialize a media model properly', () => {
      const media = Media.forge({
        id: 'id',
        date: '2017-05-07',
        type: 'type',
        url: 'url',
        title: 'title',
        copyright: 'copyright',
        description: 'description'
      });

      expect(media.serialize()).to.eql({
        id: 'id',
        date: '2017-05-07',
        type: 'type',
        url: 'url',
        title: 'title',
        copyright: 'copyright',
        description: 'description'
      });
    });

  });

});
