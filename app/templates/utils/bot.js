import AWL from 'amazon-wish-list';
import Promise from 'bluebird';
import fs from 'fs';

class Bot {
  constructor(config = {}) {
    this.tld = config.tld || 'de';
    this.minLimit = (config.limits && config.limits.min) ? config.limits.min : 0;
    this.maxLimit = (config.limits && config.limits.max) ? config.limits.max : 20;
    this.listIds = config.lists || [];
    this.multiple = config.multiple || false;
    this.history = config.history || './history.js';

    this.awl = new AWL(this.tld);

    this.lists = [];
    this.removed = [];

    this.readHistory = function() {
      try {
        let removed = fs.readFileSync(this.history, 'utf8');
        this.removed = JSON.parse(removed);
      }
      catch(e) {
        this.writeHistory();
      }
    };

    this.writeHistory = function() {
      fs.writeFileSync(this.history, JSON.stringify(this.removed));
    };

    this.remove = function(id) {
      this.removed.push(id);
      this.writeHistory()

      var filtered = [];
      for(let list of this.lists) {
        var items = [];
        for(let item of list.items) {
          if(item.id !== id) {
            items.push(item);
          }
        }
        list.items = items;
        filtered.push(list)
      }

      this.lists = filtered;
    };

    this.readHistory();
  }

  getTld() {
    return this.tld;
  }

  getPriceLimits() {
    return { min: this.minLimit, max: this.maxLimit };
  }

  getListIds() {
    return this.listIds;
  }

  getMultiple() {
    return this.multiple;
  }

  getLists() {
    return this.lists;
  }

  loadLists() {
    var promises = [];
    for(let id of this.listIds) {
      promises.push(this.awl.getById(id));
    }

    return Promise.all(promises).then((results) => {
      this.lists = results;

      return this.lists;
    });
  }

  getFiltered() {
    var filtered = [];
    for(let list of this.lists) {
      for(let item of list.items) {
        if(item.price >= this.minLimit &&
          item.price <= this.maxLimit &&
          this.removed.indexOf(item.id) < 0) {

          filtered.push(item);
        }
      }
    }

    return filtered;
  }

  chooseOne() {
    const filtered = this.getFiltered();
    const rand = Math.floor(Math.random() * filtered.length);
    const chosen = filtered[rand];

    this.remove(chosen.id);

    return chosen;
  }

  getRemoved() {
    return this.removed;
  }
}

export default Bot;
