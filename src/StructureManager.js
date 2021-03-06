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
					const creepName = structure.createCreep([WORK, CARRY, MOVE], undefined, {
						role: Roles.WORKER,
						actionInfo: new IdleActionInfo(false),
						room: structure.room.name
					});

					if (_.isString(creepName)) {
						/*eslint-disable no-console */
						++roomInfo.numWorkers;
					}
				}
				break;
			case STRUCTURE_CONTROLLER:
				break;
			default:
				/*eslint-disable no-console */
				console.log('Unknown structure type: ' + structure.structureType);
		}
	});
};

module.exports = StructureManager;
