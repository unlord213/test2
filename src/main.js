"use strict";

const IdleActionInfo = require('./IdleActionInfo');
const Harvester = require('./Harvester');
const SourceInfo = require('./SourceInfo');
const MemoryManager = require('./MemoryManager');

module.exports.loop = function() {
  // if (undefined === Memory.my) {
  //   Memory.my = {};
  // }
  //
  // if (undefined === Memory.my.sourceInfos) {
  //   Memory.my.sourceInfos = {};
  // }
  //
  // if (undefined === Memory.my.sourceInfos) {
  //   return;
  // }
  //
  // Object.entries(Game.spawns['Spawn1'].room.find(FIND_SOURCES)).forEach(([name, source]) => {
  //   let sourceInfo = Memory.my.sourceInfos[source.id];
  //   if (!sourceInfo) {
  //     Memory.my.sourceInfos[source.id] = new SourceInfo(source.id);
  //     console.log("Added source info for " + source.id);
  //   }
  // });
  //
  // Object.entries(Game.structures).forEach(([name, structure]) => {
  //   switch (structure.structureType) {
  //     case STRUCTURE_SPAWN:
  //       structure.createCreep([WORK, CARRY, MOVE], undefined, {
  //         actionInfo: new IdleActionInfo(false)
  //       });
  //       break;
  //   }
  // });
  //
  // Object.entries(Game.creeps).forEach(([name, creep]) => {
  //   // new Harvester(creep).run();
  // });
};
