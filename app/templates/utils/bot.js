import AWL from 'amazon-wish-list';
import Promise from 'bluebird';

class Bot {
  constructor(config = {}) {
    this.tld = config.tld || 'de';
    this.minLimit = (config.limits && config.limits.min) ? config.limits.min : 0;
    this.maxLimit = (config.limits && config.limits.max) ? config.limits.max : 20;
    this.listIds = config.lists || [];
    this.multiple = config.multiple || false;

    this.awl = new AWL(this.tld);

    this.lists = [];
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
}

export default Bot;
