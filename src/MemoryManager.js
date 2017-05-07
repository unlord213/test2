'use strict';

const Position = require('./Position');
const SourceInfo = require('./SourceInfo');
const AccessPoint = require('./AccessPoint');

/**
 *	Memory = {
 *		roomInfos: {
 *			roomName0: {
 *				structures: {
 *					structureId0: {
 *						transfer: {
 *							energy: 42,
 *							creepId: 'creepId0'
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
			sourceInfos: MemoryManager.initSourceInfos(room)
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

MemoryManager.isControllerBeingUpgraded = (roomName) => {
	return Boolean(Memory.roomInfos[roomName].upgradeCreepId);
};

MemoryManager.setControllerBeingUpgraded = (roomName, creepId) => {
	Memory.roomInfos[roomName].upgradeCreepId = creepId;
};

MemoryManager.getTransferEnergy = (roomName, structureId) => {

};

MemoryManager.addTransferToStructure = (structureId, creepId, energy) => {

};


module.exports = MemoryManager;
