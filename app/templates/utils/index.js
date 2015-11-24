'use strict';
const AWL = require('amazon-wish-list');

module.exports = {
  getListsByCid: function(tld, cid) {
    const awl = new AWL(tld);

    return awl.getByCid(cid);
  }
};
