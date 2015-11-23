'use strict';

const test = require('tape');
const Bot = require('../lib/bot');

const testData = {
  tld: 'de',
  limits: {
    min: 0,
    max: 30
  },
  lists: ['S1BZ8MKVJGMC', 'NDDVVVWMJ6AN'],
  multiple: false
};

test('Bot: empty constructor', function(t) {
  t.plan(5);

  const bot = new Bot();
  const limits = bot.getPriceLimits();
  t.equals(limits.min, 0, 'get: min price limit');
  t.equals(limits.max, 20, 'get: max price limit');
  t.equals(bot.getTld(), 'de', 'get: tld');
  t.equals(bot.getListIds().length, 0, 'get: no list ids');
  t.equals(bot.getMultiple(), false, 'get: not ordering multiple');
});

test('Bot: wish list fetching', function(t) {
  t.plan(19);

  const bot = new Bot(testData);
  const limits = bot.getPriceLimits();
  t.equals(limits.min, testData.limits.min, 'get: min price limit');
  t.equals(limits.max, testData.limits.max, 'get: max price limit');
  t.equals(bot.getTld(), testData.tld, 'get: tld');
  t.equals(bot.getListIds().length, testData.lists.length, 'get: list ids');
  t.equals(bot.getMultiple(), testData.multiple, 'get: multiple');

  bot.loadLists().then((results) => {
    results = bot.getLists();
    t.equals(results.length, 2, 'wish list: content');
    t.equals(results[1].title, 'testing', 'wish list: title');
    t.equals(results[1].id, testData.lists[1], 'wish list: ID');
    t.equals(results[1].items.length > 25, true, 'wish list: Items');
    
    var filtered = bot.getFiltered();
    var amount = filtered.length;
    t.equals(amount > 25, true, 'wish list filtered: items');
    t.ok(filtered[0].id, 'wish list filtered: item id');
    t.ok(filtered[0].title, 'wish list filtered: item title');
    t.ok(filtered[0].currency, 'wish list filtered: item currency');
    t.ok(filtered[0].price <= testData.limits.max && filtered[0].price >= testData.limits.min, 'wish list filtered: item price');
    
    var chosen = bot.chooseOne();
    t.ok(chosen.id, 'Chosen: item id');
    t.ok(chosen.title, 'Chosen: item title');
    t.ok(chosen.currency, 'Chosen: item currency');
    t.ok(chosen.price <= testData.limits.max && filtered[0].price >= testData.limits.min, 'Chosen: item price');
    t.ok(bot.getFiltered().length === (amount - 1), 'Chosen: removed');
  });
});
