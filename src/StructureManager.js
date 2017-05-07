'use strict';

const MemoryManager = require('./MemoryManager');

class StructureManager {}
StructureManager.findStructuresNeedingEnergy = (room) => {
	return room.find(FIND_STRUCTURES, {
		filter: (structure) => {
			const transferEnergy = MemoryManager.getTransferEnergy(room.name, structure.id) + structure.energy;
			return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
				transferEnergy < structure.energyCapacity;
		}
	});
};

module.exports = StructureManager;
