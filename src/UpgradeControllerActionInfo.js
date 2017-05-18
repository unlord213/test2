'use strict';

const ActionInfo = require('./ActionInfo');
const Actions = require('./Actions');

class UpgradeControllerActionInfo extends ActionInfo {
	constructor(controllerId) {
		super(UpgradeControllerActionInfo.id);
		this.upgrading = false;
		this.controllerId = controllerId;
	}
}
UpgradeControllerActionInfo.id = Actions.UPGRADE_CONTROLLER;

module.exports = UpgradeControllerActionInfo;
