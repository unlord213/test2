"use strict";

const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const SourceManager = require('./SourceManager');

class Harvester {
  constructor(creep) {
    this.creep = creep;
  }

  run() {
    if (this.creep.memory.actionInfo.id === IdleActionInfo.id) {
      this.findSource();
      return;
    }

    if (this.creep.memory.actionInfo.id === HarvestActionInfo.id) {
      this.harvest();
      return;
    }
  }

  harvest() {
    let actionInfo = this.creep.memory.actionInfo;

    if (_.sum(this.creep.carry) === this.creep.carryCapacity) {
      const sourceInfo = SourceManager.getSourceInfo(actionInfo.sourceId);
      sourceInfo[this.creep.pos] = null;

      actionInfo = new IdleActionInfo(true);
      return;
    }

    if (actionInfo.harvesting) {
      const source = SourceManager.getSource(actionInfo.sourceId);
      this.creep.harvest(source);
      return;
    }

    if (null === actionInfo.accessPointId) {
      const source = SourceManager.getSource(actionInfo.sourceId);
      const returnValue = this.creep.harvest(source);

      if (OK === returnValue) {
        const accessPointId = SourceManager.getAccessPointId(actionInfo.sourceId, this.creep.pos);

        if (!accessPointId) {
          const sourceInfo = SourceManager.getSourceInfo(actionInfo.sourceId);
          const newAccessPointId = Object.keys(sourceInfo).size();
          sourceInfo.accessPoints[newAccessPointId] = {
            roomPoisition: this.creep.pos,
            creepId: this.creep.id
          }
          return;
        }

        const sourceInfo = SourceManager.getSourceInfo(actionInfo.sourceId);
        const prevCreepId = sourceInfo.accessPoints[accessPointId];
        Game.getObjectById(prevCreepId).memory.actionInfo = new IdleActionInfo(false);

        sourceInfo.accessPoints[accessPointId].creepId = this.creep.id;
      }

      if (ERR_NOT_IN_RANGE === returnValue) {
        this.creep.moveTo(source);
        return;
      }

      console.log("Unknown error harvesting:", returnValue);
      return;
    }

    if (this.creep.pos === SourceManager.getAccesPointPosition(actionInfo.sourceId, actionInfo.accessPointId)) {
      const sourceInfo = SourceManager.getSourceInfo(actionInfo.sourceId);
      sourceInfo[this.creep.pos] = this.creep.id;

      actionInfo.harvesting = true;

      const source = SourceManager.getSource(actionInfo.sourceId);
      // todo: check return?
      this.creep.harvest(source);
      return;
    }

    // if (actionInfo.position) {
    //   this.creep.moveTo(actionInfo.position);
    //   return;
    // }

    const source = SourceManager.getSource(actionInfo.sourceId)
    this.creep.moveTo(source);
  }

  findSource() {
    const openAccessPoint = SourceManager.getOpenAccessPoint();
    if (openAccessPoint) {
      const actionInfo = new HarvestActionInfo(openAccessPoint.sourceId, openAccessPoint.accessPointId);
      this.creep.memory.actionInfo = actionInfo;
      return;
    }

    const unmappedSourceId = SourceManager.getUnmappedSource();
    if (unmappedSourceId) {
      const actionInfo = new HarvestActionInfo(unmappedSourceId, null);
      this.creep.memory.actionInfo = actionInfo;
      return;
    }

    console.log(this.creep.name + " has nowhere to go");
    this.creep.moveTo(Game.structures["Spawn1"]);
  }
}

module.exports = Harvester;
