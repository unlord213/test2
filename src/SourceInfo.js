"use strict";

/**
 *
 {
 "0": {
 roomPosition: [x,y],
 creepId: 'foo'
}
}
 */
class SourceInfo {
  constructor(id) {
    this.id = id;
    this.accessPoints = {};
    // this.openSpots = [];
    // this.harvestSpots = [];
    this.mapped = false;
  }
}

module.exports = SourceInfo;
