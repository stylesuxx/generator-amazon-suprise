'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var utils = require('../lib/index')
var Bot = require('../lib/bot')

module.exports = generators.Base.extend({
  helper: {
    cleanAppname: function(appname) {
      var appname = appname.replace(/\s/g, '-');

      return appname;
    }
  },

  initializing: function() {
    this.prompts = require('./prompts');
    this.author = { name: 'Chris Landa', email: 'stylesuxx@gmail.com'};
    this.appname = this.helper.cleanAppname(this.appname);
    this.lists = [];

    this.baseConfig = () => {
      return this.prompts.getAppname(this).then((appname) => {
        this.appname = appname;

        return this.prompts.getTld(this);
      }).then((tld) => {
        this.tld = tld;

        return new Promise((resolve, reject) => resolve());
      });
    };

    this.cidConfig = () => {
      return this.prompts.getCid(this).then((cid) =>{
        this.cid = cid;

        this.log(chalk.green('>'), chalk.bold('Fetching public lists - this may take some time...'));
        return utils.getListsByCid(this.tld, this.cid);
      }).then((lists) => {
        var choices = [];
        for(let list of lists) {
          choices.push({
            name: list.title + ' (' + list.items.length + ')',
            value: list.id
          })
        }

        if(choices.length > 0) {
          return this.prompts.getEnabledLists(this, choices);
        }
        else {
          this.log(chalk.orange('!'), chalk.bold('No public wish lists for this customer ID.'));
          return new Promise((resolve, reject) => resolve([]));
        }
      }, (error) => {
        this.log(chalk.red('!'), chalk.bold('Customer ID is not valid - can not get wish lists!'));
        return this.prompts.getRetry(this).then((retry) => {
          if(retry) {
            return this.cidConfig();
          }
          else {
            return new Promise((resolve, reject) => resolve([]));
          }
        });
      });
    }
  },

  prompting: function() {
    var done = this.async();

    this.baseConfig().then(() => {
      return this.cidConfig();
    }).then((lists) => {
      this.lists = lists;

      return this.prompts.getMinLimit(this);
    }).then((limit) => {
      this.minLimit = limit;

      return this.prompts.getMaxLimit(this);
    }).then((limit) => {
      this.maxLimit = limit;

      return this.prompts.getMultiple(this);
    }).then((multiple) => {
      this.multiple = multiple;

      let options = {
        tld: this.tld,
        limits: {
          min: this.minLimit,
          max: this.maxLimit
        },
        lists: this.lists
      };

      const bot = new Bot(options);
      return bot.loadLists().then(() => {
        return bot.getFiltered();
      });
    }).then((items) => {
      this.matches = items;

      return this.prompts.getShowMatches(this, items);
    }).then((show) => {
      if(show) {
        for(let match of this.matches) {
          var price = match.price.toFixed(2);
          var padding = 7 - price.length;
          for(var i = 0; i < padding; i++) {
            price = ' ' + price;
          }

          this.log(chalk.green('> ') + chalk.bold(match.currency + ' ' + price + ' - ' + match.title));
        }
      }
      done();
    });
  },

  configuring: {
  },

  default: {
  },

  writing: {
    static: function() {
      this.copy('.gitignore', '.gitignore');
      this.copy('index.js', 'index.js');

      this.copy('../../lib/index.js', 'lib/index.js');
      this.copy('../../lib/bot.js', 'lib/bot.js');
    },

    templates: function() {
      this.template('_package.json', 'package.json');
      this.template('_config.js', 'config.js');
    }
  },

  conflicts: {
  },

  install: {
  },

  end: {
  }
});
