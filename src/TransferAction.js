'use strict';

class TransferAction {}

const IdleActionInfo = require('./IdleActionInfo');
// const Worker = require('./Worker');

TransferAction.run = (creep) => {
	const actionInfo = creep.memory.actionInfo;

	if (0 === creep.carry.energy) {
		creep.memory.actionInfo = new IdleActionInfo(false);
		return;
	}

	const target = Game.getObjectById(actionInfo.structureId);
	if (actionInfo.transferring) {
		creep.transfer(target, RESOURCE_ENERGY);
		return;
	}

	const result = creep.transfer(target, RESOURCE_ENERGY);
	switch (result) {
		case OK:
			actionInfo.transferring = true;
			break;
		case ERR_NOT_IN_RANGE:
			creep.moveTo(target, {
				visualizePathStyle: {
					stroke: '#ffffff'
				}
			});
			break;
		case ERR_FULL:
			creep.memory.actionInfo = new IdleActionInfo(_.sum(creep.carry) === creep.carryCapacity);
			break;
		default:
			/*eslint-disable no-console */
			console.log('Error transferring: ' + result);
	}
};

module.exports = TransferAction;
