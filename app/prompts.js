module.exports = {
  getAppname: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'input',
        name: 'appname',
        message: 'Bot name',
        default: generator.appname
      }, (answers) => {
        resolve(generator.helper.cleanAppname(answers.appname));
      });
    });
  },

  getTld: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'list',
        name: 'tld',
        message: 'Your amazon order tld',
        choices: ['de', 'co.uk', 'com'],
        default: 'de'
      }, (answers) => {
        resolve(answers.tld);
      });
    });
  },

  getCid: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'input',
        name: 'cid',
        message: 'Amazon Customer ID to look up',
        default: '14 characters'
      }, (answers) => {
        resolve(answers.cid);
      });
    });
  },

  getMinLimit: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'input',
        name: 'minLimit',
        message: 'Minimum price',
        default: 0.00,
        validate: (value) => !isNaN(value) ? true : 'Minimum price has to be a number'
      }, (answers) => {
        resolve(answers.minLimit);
      });
    });
  },

  getMaxLimit: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'input',
        name: 'maxLimit',
        message: 'Maximum price',
        default: 20.00,
        validate: (value) => !isNaN(value) ? true : 'Maximum price has to be a number'
      }, (answers) => {
        resolve(answers.maxLimit);
      });
    });
  },

  getMultiple: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'confirm',
        name: 'multiple',
        message: 'Buy multiple items until maximum price is reached?',
        default: false
      }, (answers) => {
        resolve(answers.multiple);
      });
    });
  },

  getEnabledLists: function(generator, lists) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'checkbox',
        name: 'lists',
        message: 'Enable wish lists:',
        choices: lists
      }, (answers) => {
        resolve(answers.lists);
      });
    });
  },

  getShowMatches: function(generator, items) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'confirm',
        name: 'showMatches',
        message: 'Found ' + items.length + ' items that match your price range, show them?',
        default: true
      }, (answers) => {
        resolve(answers.showMatches);
      });
    });
  },

  getRetry: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'confirm',
        name: 'retry',
        message: 'Try another customer ID?',
        default: true
      }, (answers) => {
        resolve(answers.retry);
      });
    });
  }
}
