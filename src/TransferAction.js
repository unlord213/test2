'use strict';

class TransferAction {}

const IdleActionInfo = require('./IdleActionInfo');
const MemoryManager = require('./MemoryManager');
// const Worker = require('./Worker');

TransferAction.run = (creep) => {
	// console.log(creep.name + ' transfer action');
	const actionInfo = creep.memory.actionInfo;

	if (0 === creep.carry.energy) {
		console.log(creep.name + ' out of energy');
		const roomInfo = MemoryManager.getRoomInfo(creep.room.name);
		delete roomInfo.energyStructureInfos.spawns[actionInfo.structureId].transfers[creep.name];
		creep.memory.actionInfo = new IdleActionInfo(false);
		return;
	}

	const target = Game.getObjectById(actionInfo.structureId);
	if (actionInfo.transferring) {
		// console.log(creep.name + ' continuing to transfer');
		creep.transfer(target, RESOURCE_ENERGY);
		return;
	}

	// console.log(creep.name + ' attempting to transfer');
	const result = creep.transfer(target, RESOURCE_ENERGY);
	switch (result) {
		case OK:
			// console.log(creep.name + ' transfer ok');
			actionInfo.transferring = true;
			break;
		case ERR_NOT_IN_RANGE:
			// console.log(creep.name + ' transfer not in range');
			creep.moveTo(target, {
				visualizePathStyle: {
					stroke: '#ffffff'
				}
			});
			break;
		case ERR_FULL:
			console.log(creep.name + ' target full');
			creep.memory.actionInfo = new IdleActionInfo(_.sum(creep.carry) === creep.carryCapacity);
			break;
		default:
			/*eslint-disable no-console */
			console.log('Error transferring: ' + result);
	}
};

module.exports = TransferAction;
