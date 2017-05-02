"use strict";

const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');

class Harvester {
  constructor(creep) {
    this.creep = creep;
  }

  run() {
    if(this.creep.memory.actionInfo.id === IdleActionInfo.id) {
      this.findTarget();
      return;
    }

    this.harvest();
  }

  harvest() {
    if (_.sum(this.creep.carry) === this.creep.carryCapacity) {
      this.creep.memory.actionInfo = new IdleActionInfo(true);
      return;
    }

    if (this.creep.pos === this.creep.memory.actionInfo.position) {
      const source = Game.getObjectById(this.creep.memory.actionInfo.sourceId);
      this.creep.harvest(source);
      return;
    }

    if(this.creep.memory.actionInfo.position) {
      this.creep.moveTo(this.creep.memory.actionInfo.position);
    }

    this.creep.moveTo(Game.getObjectById(this.creep.memory.actionInfo.sourceId));
  }

  findTarget() {
    for (let [sourceId, sourceInfo] of Memory.my.sourceInfos.entries()) {
      if (sourceInfo.openSpots.length) {
        const actionInfo = new HarvestActionInfo(sourceId, sourceInfo.openSpots[0], false);
        this.creep.memory.actionInfo = actionInfo;
        sourceInfo.openSpots.shift();
        return;
      }

      if (!sourceInfo.mapped) {
        const actionInfo = new HarvestActionInfo(sourceId, null, false);
        this.creep.memory.actionInfo = actionInfo;
        return;
      }
    }

    console.log(this.creep.name + " has nowhere to go");
    this.creep.moveTo(Game.structures["Spawn1"]);
  }
}

module.exports = Harvester;
