'use strict';

const Position = require('./Position');
const SourceInfo = require('./SourceInfo');
const EnergyStructureInfo = require('./EnergyStructureInfo');
const AccessPoint = require('./AccessPoint');

/**
 *	Memory = {
 *		roomInfos: {
 *			roomName0: {
 *				energyStructureInfos: {
 *					spawns: {
 *						structureId0: {
 *							energyCapacity: 100,
 *						 	energy: 42,
 *						  needsEnergy: true,
 *						  transfers: {
 *							 creepId0: 42
 *						  }
 *					  }
 *					},
 *				},
 *				sourceInfos: {
 *					sourcdId0: {
 *						accessPoints: {
 *							'0': {
 *								pos: new Position(x0, y0),
 *							 	creepId: 'creep0'
 *						  }
 *					  }
 *					}
 *			 	}
 *		  }
 *		}
 *	}
 */

// TODO: change to memoryupdater and merge energystructuremanager and sourcemanager into memorymanager
class MemoryManager {}
MemoryManager.initRoomInfos = () => {
	if (!Memory.roomInfos) {
		Memory.roomInfos = {};
	}

	for (const roomName of Object.keys(Game.rooms)) {
		if (Memory.roomInfos[roomName]) {
			return;
		}

		/*eslint-disable no-console */
		console.log('Memory manager init room ' + roomName);

		const room = Game.rooms[roomName];
		Memory.roomInfos[roomName] = {
			sourceInfos: MemoryManager._initSourceInfos(room),
			energyStructureInfos: MemoryManager._initEnergyStructures(room)
		};
	}
};

MemoryManager.updateSpawns = () => {
	_.forIn(Memory.roomInfos, (roomInfo) => {
		_.forIn(roomInfo.energyStructureInfos.spawns, (structureInfo, structureId) => {
			const structure = Game.getObjectById(structureId);
			structureInfo.energy = structure.energy;

			let sum = structureInfo.energy;
			for (const creepId of Object.keys(structureInfo.transfers)) {
				sum += structureInfo.transfers[creepId];
			}

			if (sum < structureInfo.energyCapacity) {
				structureInfo.needsEnergy = true;
			}
		});
	});
};

// TODO: is this method necessary?
MemoryManager.getRoomInfo = (roomName) => {
	return Memory.roomInfos[roomName];
};

MemoryManager._initSourceInfos = (room) => {
	const sourceInfos = {};
	for (const source of room.find(FIND_SOURCES)) {
		sourceInfos[source.id] = MemoryManager._initSourceInfo(source);
	}

	return sourceInfos;
};

MemoryManager._initSourceInfo = (source) => {
	const roomName = source.room.name;
	const x = source.pos.x;
	const y = source.pos.y;

	const testPoints = [
		new Position(x + 1, y + 1),
		new Position(x + 1, y),
		new Position(x + 1, y - 1),
		new Position(x, y + 1),
		new Position(x, y - 1),
		new Position(x - 1, y + 1),
		new Position(x - 1, y),
		new Position(x - 1, y - 1),
	];

	const sourceInfo = new SourceInfo();

	for (const [idx, pos] of testPoints.entries()) {
		if ('wall' !== Game.map.getTerrainAt(pos.x, pos.y, roomName)) {
			sourceInfo.accessPoints[idx] = new AccessPoint(pos);
		}
	}

	return sourceInfo;
};

MemoryManager._initEnergyStructures = (room) => {
	const structures = room.find(FIND_STRUCTURES, MemoryManager.energyStructureFilter);

	const structureInfos = {
		spawns: {}
	};

	structures.forEach((structure) => {
		switch (structure.structureType) {
			case STRUCTURE_SPAWN:
				structureInfos.spawns[structure.id] = new EnergyStructureInfo(structure.energyCapacity, structure.energy);
				break;
			default:
				/*eslint-disable no-console */
				console.log('Unknown energy structure type: ' + structure.structureType);
		}
	});

	return structureInfos;
};

MemoryManager.energyStructureFilter = {
	filter: (structure) => {
		return (structure.structureType === STRUCTURE_SPAWN);
		// return (structure.structureType === STRUCTURE_EXTENSION ||
		// 	structure.structureType === STRUCTURE_SPAWN);
	}
};

module.exports = MemoryManager;
