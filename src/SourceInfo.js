"use strict";

class SourceInfo {
  constructor(id) {
    this.id = id;
    this.openSpots = [];
    this.harvestSpots = [];
    this.mapped = false;
  }
}

module.exports = SourceInfo;
