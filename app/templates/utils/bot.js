import AWL from 'amazon-wish-list';
import Promises from 'bluebird';

class Bot {
  constructor(config = {}) {
    this.tld = config.tld || 'de';
    this.minLimit = (config.limits && config.limits.min) ? config.limits.min : 0;
    this.maxLimit = (config.limits && config.limits.max) ? config.limits.max : 20;
    this.listIds = config.lists || [];
    this.multiple = config.multiple || false;
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

  /*
  getAllItems() {
    return this.itemsAll;
  }
  */
}

export default Bot;
