'use strict';

const Moment = require('moment');

const Db   = require('../../db').db;
const Knex = require('../../db').knex;

exports.Media = Db.Model.extend({
  tableName: 'media',

  serialize: function () {
    const formattedDate = Moment.utc(this.get('date')).format('YYYY-MM-DD');

    return {
      id: this.get('id'),
      url: this.get('url'),
      date: formattedDate,
      type: this.get('type'),
      title: this.get('title'),
      copyright: this.get('copyright'),
      description: this.get('description')
    };
  }

});
