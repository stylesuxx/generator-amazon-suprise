'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var AWL = require('amazon-wish-list');

module.exports = generators.Base.extend({
  helper: {
    cleanAppname: function(appname) {
      var appname = appname.replace(/\s/g, '-');

      return appname;
    }
  },

  initializing: function() {
    this.author = { name: 'Chris Landa', email: 'stylesuxx@gmail.com'};
    this.appname = this.helper.cleanAppname(this.appname);
    this.lists = [];
    this.cidValid = false;

    this.prompts = require('./prompts');

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

        this.log(chalk.green('>'), chalk.bold('Fetching public lists...'));
        var awl = new AWL(this.tld);
        return awl.getByCid(this.cid);
      }).then((lists) => {
        this.cidValid = true;
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
    },

    templates: function() {
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
