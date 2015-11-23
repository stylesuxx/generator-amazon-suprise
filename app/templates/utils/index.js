'use strict';
const AWL = require('amazon-wish-list');
const Promise = require('bluebird');
const fs = require('fs');

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

  selectItem: function(items) {
    var rand = Math.floor(Math.random() * items.length);

    return items[rand];
  },

  selectItems: function(ids) {

  },

  getListsByCid: function(tld, cid) {
    const awl = new AWL(tld);

    return awl.getByCid(cid);
  },

  addToHistory: function(path, id) {
    try {
      var history = fs.readFileSync(path, 'utf8');
      var history = JSON.parse(history);
      history.push({id: id, date: new Date().getTime()});
      fs.writeFileSync(path, JSON.stringify(history));
    } catch(e) {
      let history = [{id: id, date: new Date().getTime()}];
      fs.writeFileSync(path, JSON.stringify(history));
    }
  }
};
