'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const Roles = require('./Roles');
const MemoryManager = require('./MemoryManager');

class StructureManager {}

StructureManager.run = () => {
	_.forIn(Game.structures, (structure) => {
		const roomInfo = MemoryManager.getRoomInfo(structure.room.name);
		// console.log('********************************8');
		switch (structure.structureType) {
			case STRUCTURE_SPAWN:
				// console.log('spawmn has ' + roomInfo.numWorkers + '/' + roomInfo.maxWorkers);
				if (roomInfo.numWorkers < roomInfo.maxWorkers) {
					const creepName = structure.createCreep([WORK, CARRY, MOVE], undefined, {
						role: Roles.WORKER,
						actionInfo: new IdleActionInfo(false),
						room: structure.room.name
					});
					if (_.isString(creepName)) {
						console.log('Created creep ' + creepName);
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
