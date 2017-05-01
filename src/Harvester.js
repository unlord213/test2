"use strict";

const IdleActionInfo = require('./IdleActionInfo');

class Harvester {
  constructor(creep) {
    this.creep = creep;
  }

  harvest() {
    /**
     * if harvesting
     *   stop harvesting if necessary
     *
     *   if at havest position
     *     harvset
     *   else
     *     move
     */
    console.log('test', _.sum(this.creep.carry), this.creep.carryCapacity);
    if (_.sum(this.creep.carry) === this.creep.carryCapacity) {
      console.log('in');
      this.creep.memory.action = new IdleActionInfo(true);
      this.creep.foo('bar');
      return;
    }
  }
}

module.exports = Harvester;
