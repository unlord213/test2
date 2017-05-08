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
 *					structureId0: {
 *						energyCapacity: 100,
 *						energy: 42,
 *						needsEnergy: true,
 *						transfers: {
 *							creepId0: 42
 *						}
 *					}
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

class MemoryManager {}
MemoryManager.initRoomInfos = () => {
	if (!Memory.roomInfos) {
		Memory.roomInfos = {};
	}

	_.forIn(Game.rooms, (room, roomName) => {
		if (Memory.roomInfos[roomName]) {
			return;
		}

		/*eslint-disable no-console */
		console.log('Memory manager init room ' + roomName);
		Memory.roomInfos[roomName] = {
			sourceInfos: MemoryManager.initSourceInfos(room),
			energyStructureInfos: MemoryManager.initEnergyStructures(room)
		};
	});
};

MemoryManager.initSourceInfos = (room) => {
	const sourceInfos = {};
	for (const source of room.find(FIND_SOURCES)) {
		sourceInfos[source.id] = MemoryManager.initSourceInfo(source);
	}

	return sourceInfos;
};

MemoryManager.initSourceInfo = (source) => {
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

MemoryManager.initEnergyStructures = (room) => {
	const structures = room.find(FIND_STRUCTURES, {
		filter: (structure) => {
			return (structure.structureType === STRUCTURE_EXTENSION ||
				structure.structureType === STRUCTURE_SPAWN);
		}
	});


	const structureInfos = {};
	structures.forEach((structure) => {
		if (!structureInfos[structure.id]) {
			structureInfos[structure.id] = new EnergyStructureInfo(structure.energyCapacity, structure.energy);
		}
	});

	return structureInfos;
};

MemoryManager.updateEnergyStructures = () => {
	for (const roomName of Object.keys(Memory.roomInfos)) {
		const structureInfos = Memory.roomInfos[roomName].energyStructureInfos;
		for (const structureId of Object.keys(structureInfos)) {
			const structureInfo = structureInfos[structureId];
			const structure = Game.getObjectById(structureId);
			structureInfo.energy = structure.energy;

			let sum = structureInfo.energy;
			for (const transferCreepId of Object.keys(structureInfo.transfers)) {
				sum += structureInfo.transfers[transferCreepId];
			}

			if (sum < structureInfo.energyCapacity) {
				structureInfo.needsEnergy = true;
			}
		}
	}
};

MemoryManager.getRoomInfo = (roomName) => {
	return Memory.roomInfos[roomName];
};

MemoryManager.findStructureNeedingEnergy = (roomName, energy, creepId) => {
	const structureInfos = Memory.roomInfos[roomName].energyStructureInfos;
	for (const structureId of Object.keys(structureInfos)) {
		const structureInfo = structureInfos[structureId];

		if (structureInfo.needsEnergy) {
			let sum = energy;
			for (const transferCreepId of Object.keys(structureInfo.transfers)) {
				sum += structureInfo.transfers[transferCreepId];
			}

			if (sum <= structureInfo.energyCapacity) {
				structureInfo.transfers[creepId] = energy;

				if (sum === structureInfo.energyCapacity) {
					structureInfo.needsEnergy = false;
				}

				return structureId;
			}
		}
	}
};

MemoryManager.getAccessPoint = (roomName, sourceId, accessPointId) => {
	return Memory.roomInfos[roomName].sourceInfos[sourceId].accessPoints[accessPointId];
};

MemoryManager.getOpenAccessPoint = (roomName, creepId) => {
	const sourceInfos = Memory.roomInfos[roomName].sourceInfos;
	for (const sourceId of Object.keys(sourceInfos)) {
		const accessPoints = sourceInfos[sourceId].accessPoints;

		for (const accessPointId of Object.keys(accessPoints)) {
			if (!accessPoints[accessPointId].creepId) {
				accessPoints[accessPointId].creepId = creepId;
				return {
					sourceId: sourceId,
					accessPointId: accessPointId
				};
			}
		}
	}
};


module.exports = MemoryManager;
