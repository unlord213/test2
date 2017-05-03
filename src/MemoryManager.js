"use strict";

const SourceInfo = require('./SourceInfo');

class MemoryManager {}
MemoryManager.initSources = function() {
  if (!Memory.my) {
    Memory.my = {};
  }

  if (!Memory.my.sourceInfos) {
    Memory.my.sourceInfos = {};
    Game.spawns['Spawn1'].room.find(FIND_SOURCES).forEach((source) => {
      Memory.my.sourceInfos[source.id] = new SourceInfo();
    });
  }
}

module.exports = MemoryManager;
