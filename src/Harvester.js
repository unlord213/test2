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
      this.findTarget();
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
      const source = Game.getObjectById(actionInfo.sourceId);
      this.creep.harvest(source);
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




  findTarget() {
    const openAccessPoint = SourceManager.getOpenAccessPoint();
    if (openAccessPoint) {
      const actionInfo = new HarvestActionInfo(openAccessPoint.sourceId, openAccessPoint.accessPointId);
      this.creep.memory.actionInfo = actionInfo;
      return;
    }

    const unmappedSourceId = SourceManager.getUnmappedSource();
    if (unmappedSource) {
      const actionInfo = new HarvestActionInfo(unmappedSourceId, null);
      this.creep.memory.actionInfo = actionInfo;
      return;
    }

    console.log(this.creep.name + " has nowhere to go");
    this.creep.moveTo(Game.structures["Spawn1"]);

    // const openAccessPoints = _.forEach(Memory.my.sourceInfos, function(sourceInfo) {
    //   _.pickBy(sourceInfo.accessPoints, function(accessPoint, accessPointId) {
    //     console.log(JSON.stringify(accessPoint), accessPointId);
    //     return accessPoint.creepId;
    //   });
    //   // return sourceInfo.mapped;
    // });
    //
    // console.log(JSON.stringify(openAccessPoints));
    // // if(openAccessPoints.length) {
    // //
    // // }

    // for (let [sourceId, sourceInfo] of Memory.my.sourceInfos.entries()) {
    //   if (sourceInfo.openSpots.length) {
    //     const actionInfo = new HarvestActionInfo(sourceId, sourceInfo.openSpots[0], false);
    //     this.creep.memory.actionInfo = actionInfo;
    //     sourceInfo.openSpots.shift();
    //     return;
    //   }
    //
    //   if (!sourceInfo.mapped) {
    //     const actionInfo = new HarvestActionInfo(sourceId, null, false);
    //     this.creep.memory.actionInfo = actionInfo;
    //     return;
    //   }
    // }
    //
    // console.log(this.creep.name + " has nowhere to go");
    // this.creep.moveTo(Game.structures["Spawn1"]);
  }
}

module.exports = Harvester;
