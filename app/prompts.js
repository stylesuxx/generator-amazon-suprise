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
        message: 'On which Amazon domain should I look for your wish lists',
        choices: [
          {name: 'amazon.de', value:'de'},
          {name: 'amazon.co.uk', value:'co.uk'},
          {name: 'amazon.com', value:'com'}
        ],
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
        message: 'Please tell me your customer ID on this domain',
        default: 'A3ETU88UAET9K3'
      }, (answers) => {
        resolve(answers.cid);
      });
    });
  },

  getEnabledLists: function(generator, lists) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'checkbox',
        name: 'lists',
        message: 'Tell me from which lists I may chose to surprise you',
        choices: lists
      }, (answers) => {
        resolve(answers.lists);
      });
    });
  },

  getMinLimit: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'input',
        name: 'minLimit',
        message: 'Minimum',
        default: 0.00,
        validate: (value) => !isNaN(value) ? true : 'Minimum has to be a number'
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
        message: 'Maximum',
        default: 20.00,
        validate: (value) => !isNaN(value) ? true : 'Maximum has to be a number'
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
        message: 'Should I surprise you with multiple items to reach your maximum limit?',
        default: false
      }, (answers) => {
        resolve(answers.multiple);
      });
    });
  },

  getShowMatches: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'confirm',
        name: 'showMatches',
        message: 'Do you want to see a list of items matching your price range?',
        default: false
      }, (answers) => {
        resolve(answers.showMatches);
      });
    });
  },

  getContinue: function(generator) {
    return new Promise((resolve, reject) => {
      generator.prompt({
        type: 'confirm',
        name: 'continue',
        message: 'Continue?',
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
        message: 'Should I try to look up another customer ID?',
        default: true
      }, (answers) => {
        resolve(answers.retry);
      });
    });
  }
}
