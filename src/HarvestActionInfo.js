"use strict";

const ActionInfo = require('./ActionInfo');
const Actions = require('./Actions');

class HarvestActionInfo extends ActionInfo {
  constructor(sourceId, position, harvesting) {
    super(HarvestActionInfo.id);
    this.sourceId = sourceId;
    this.position = position;
    this.harvesting = harvesting;
  }
}
HarvestActionInfo.id = Actions.HARVESTING

module.exports = HarvestActionInfo;
