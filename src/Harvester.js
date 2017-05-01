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
     *   if at harvest position
     *     harvest
     *   else
     *     move
     */
    if (_.sum(this.creep.carry) === this.creep.carryCapacity) {
      this.creep.memory.action = new IdleActionInfo(true);
      return;
    }

    if (this.creep.pos === this.creep.memory.action.position) {
      const source = Game.getObjectById(this.creep.memory.action.sourceId);
      this.creep.harvest(source);
      return;
    }

    this.creep.moveTo(this.creep.memory.action.position);
  }
}

module.exports = Harvester;
