'use strict';
const config = require('./config');
const utils = require('./utils');

utils.getItemsInRange(config.tld, config.lists, config.minLimit, config.maxLimit).then((results) => {
  return utils.selectItem(results);
}).then((selected) => {
  var chosen = [selected];

  utils.addToHistory('./history.js', selected.id)
  console.log('Chosen items:', chosen);

});
// Select one(or multiple) of those items randomly
