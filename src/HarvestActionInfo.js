"use strict";

const ActionInfo = require('./ActionInfo');
const Actions = require('./Actions');

class HarvestActionInfo extends ActionInfo {
  constructor(sourceId, position, harvesting) {
    super(Actions.HARVESTING);
    this.sourceId = sourceId;
    this.position = position;
    this.harvesting = harvesting;
  }
}

module.exports = HarvestActionInfo;
