'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
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

        this.log(chalk.green('>'), chalk.bold('Fetching public lists - this ' +
          'may take some time...'));
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
          this.log(chalk.orange('!'), chalk.bold('No public wish lists for ' +
            'this customer ID.'));
          return new Promise((resolve, reject) => resolve([]));
        }
      }, (error) => {
        this.log(chalk.red('!'), chalk.bold('Customer ID is not valid - can ' +
          'not get wish lists!'));
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

      return this.prompts.getShowMatches(this);
    }).then((show) => {
      if(show) {
        let options = {
          tld: this.tld,
          limits: {
            min: this.minLimit,
            max: this.maxLimit
          },
          lists: this.lists
        };

        this.log(chalk.green('>'), chalk.bold('Fetching items in price range - ' +
        'this may take some time...'));
        const bot = new Bot(options);
        return bot.loadLists().then(() => {
          for(let match of bot.getFiltered()) {
            var price = match.price.toFixed(2);
            var padding = 7 - price.length;
            for(var i = 0; i < padding; i++) {
              price = ' ' + price;
            }

            this.log(chalk.green('> ') + chalk.bold(match.currency + ' ' + price +
              ' - ' + match.title));
          }
        });
      }
    }).then(() => {
      this.log(yosay('Read the information below very ' +
        chalk.red('carefully') + ' in order to have the best possible ' +
        'experience.'));
      this.log(chalk.bold('In the next steps I will prompt you for your ' +
        'amazon credentials, there are some things to keep in mind.'));
      this.log();
      this.log(chalk.bold('Suggested Amazon Setup:'));
      this.log('The most secure setup is to have a seperate Amazon' +
        ' account on the same tld as provided before (' + chalk.green(
        'https://www.amazon.' + this.tld) + '). This account should be ' +
        'prepaid in order to make sure to keep the losses small in case ' +
        chalk.red('something goes wrong') + '.');
      this.log();
      this.log(chalk.bold('What can go wrong:'));
      this.log('Extensive test suites are in place for all the components ' +
        'the bot relies on ' + chalk.bold('BUT') + ' heavy parsing of the ' +
        'Amazon page is involved and thus the bot relies on the Amazon page ' +
        'not changing. In case, this happens the bot may misbehave up ' +
        'to the point where he may order items that are not on your wish ' +
        'list or even out of your price range - although this is '
        + chalk.bold('very unlikely'));
      
      return this.prompts.getContinue(this);
    }).then((prompt) => {
      if(prompt) {
        done();
      }
      else {
        this.env.error('Aborted...');
      }
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
