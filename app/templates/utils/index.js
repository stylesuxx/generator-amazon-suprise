'use strict';
const AWL = require('amazon-wish-list');
const Promise = require('bluebird');

module.exports = {
  getItemsInRange: function(tld, ids, min, max) {
    const awl = new AWL(tld);
    var promises = [];
    var items = [];

    for(let id of ids) {
      promises.push(awl.getById(id));
    }

    return Promise.all(promises).then((results) => {
      for(let list of results) {
        for(let item of list.items) {
          if(item.price <= max && item.price >= min) {
            items.push(item);
          }
        }
      }

      return items;
    });
  },

  selectItem: function(ids) {

  },

  selectItems: function(ids) {

  },

  getListsByCid: function(tld, cid) {
    const awl = new AWL(tld);

    return awl.getByCid(cid);
  }
};
