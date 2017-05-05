'use strict';

const ActionInfo = require('./ActionInfo');
const Actions = require('./Actions');

class HarvestActionInfo extends ActionInfo {
	constructor(sourceId, accessPointId) {
		super(HarvestActionInfo.id);
		this.sourceId = sourceId;
		this.accessPointId = accessPointId;
		this.harvesting = false;
	}
}
HarvestActionInfo.id = Actions.HARVESTING;

module.exports = HarvestActionInfo;
