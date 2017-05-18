'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const MemoryManager = require('./MemoryManager');
// const Worker = require('./Worker');

class UpgradeControllerAction {}

UpgradeControllerAction.run = (creep) => {
	const actionInfo = creep.memory.actionInfo;

	if (0 === creep.carry.energy) {
		const roomInfo = MemoryManager.getRoomInfo(creep.room.name);
		if (roomInfo.upgradeCreepId === creep.name) {
			roomInfo.upgradeCreepId = null;
		}
		creep.memory.actionInfo = new IdleActionInfo(false);
		return;
	}

	const target = Game.getObjectById(actionInfo.controllerId);
	if (actionInfo.upgrading) {
		creep.upgradeController(target);
		return;
	}

	const result = creep.upgradeController(target);
	switch (result) {
		case OK:
			actionInfo.upgrading = true;
			break;
		case ERR_NOT_IN_RANGE:
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
