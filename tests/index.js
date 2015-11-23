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
  t.equals(limits.min, 0, 'min price limit');
  t.equals(limits.max, 20, 'max price limit');
  t.equals(bot.getTld(), 'de', 'tld');
  t.equals(bot.getListIds().length, 0, 'no list ids');
  t.equals(bot.getMultiple(), false, 'not ordering multiple');
});

test('Bot: testdata', function(t) {
  t.plan(5);

  const bot = new Bot(testData);
  const limits = bot.getPriceLimits();
  t.equals(limits.min, testData.limits.min, 'min price limit');
  t.equals(limits.max, testData.limits.max, 'max price limit');
  t.equals(bot.getTld(), testData.tld, 'tld');
  t.equals(bot.getListIds().length, testData.lists.length, 'list ids');
  t.equals(bot.getMultiple(), testData.multiple, 'multiple ordering');
});
