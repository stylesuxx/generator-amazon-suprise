'use strict;'
const AWL = require('amazon-wish-list');

module.exports = {
  getItemsInRange: function(tld, ids, min, max) {
    const awl = new AWL(tld);
  },

  getListsByCid: function(tld, cid) {
    const awl = new AWL(tld);

    return awl.getByCid(cid);
  }
};
