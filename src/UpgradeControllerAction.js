'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const MemoryManager = require('./MemoryManager');
// const Worker = require('./Worker');

class UpgradeControllerAction {}

UpgradeControllerAction.run = (creep) => {
	// console.log(creep.name + ' upgrade controller action');
	const actionInfo = creep.memory.actionInfo;

	if (0 === creep.carry.energy) {
		// console.log(creep.name + ' empty');
		const roomInfo = MemoryManager.getRoomInfo(creep.room.name);
		if (roomInfo.upgradeCreepId === creep.name) {
			roomInfo.upgradeCreepId = null;
		}
		creep.memory.actionInfo = new IdleActionInfo(false);
		return;
	}

	const target = Game.getObjectById(actionInfo.controllerId);
	if (actionInfo.upgrading) {
		// console.log(creep.name + ' continuing to upgrade');
		creep.upgradeController(target);
		return;
	}

	// console.log(creep.name + ' attempting to upgrade');
	const result = creep.upgradeController(target);
	switch (result) {
		case OK:

			// console.log(creep.name + ' upgrade ok');
			actionInfo.upgrading = true;
			break;
		case ERR_NOT_IN_RANGE:
			// console.log(creep.name + ' upgrade not in range');
			creep.moveTo(target, {
				visualizePathStyle: {
					stroke: '#ffffff'
				}
			});
			break;
		default:
			/*eslint-disable no-console */
			console.log('Error upgrading controller: ' + result);
	}
};

module.exports = UpgradeControllerAction;
