'use strict';

const ActionInfo = require('./ActionInfo');
const Actions = require('./Actions');

class UpgradeControllerActionInfo extends ActionInfo {
	constructor() {
		super(UpgradeControllerActionInfo.id);
		this.upgrading = false;
	}
}
UpgradeControllerActionInfo.id = Actions.UPGRADE_CONTROLLER;

module.exports = UpgradeControllerActionInfo;
