'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const Roles = require('./Roles');
const MemoryManager = require('./MemoryManager');

class StructureManager {}

StructureManager.run = () => {
	_.forIn(Game.structures, (structure) => {
		const roomInfo = MemoryManager.getRoomInfo(structure.room.name);

		switch (structure.structureType) {
			case STRUCTURE_SPAWN:
				if (roomInfo.numWorkers < roomInfo.maxWorkers) {
					structure.createCreep([WORK, CARRY, MOVE], undefined, {
						role: Roles.WORKER,
						actionInfo: new IdleActionInfo(false)
					});
					++roomInfo.numWorkers;
				}
				break;
			default:
				/*eslint-disable no-console */
				console.log('Unknown structure type: ' + structure.structureType);
		}
	});
};

module.exports = StructureManager;
