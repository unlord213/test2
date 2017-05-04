'use strict';

/**
 *	Memory = {
 *		roomInfos: {
 *			roomName0: {
 *				sourceInfos: {
 *					sourcdId0: {
 *						accessPoints: {
 *							'0': {
 *								pos: new RoomPosition(x0, y0, 'roomName0'),
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
		let roomInfo = Memory.roomInfos[roomName];
		if (roomInfo) {
			return;
		}

		roomInfo.sourceInfos = MemoryManager.initSourceInfos(room);
	});
};

MemoryManager.initSourceInfos = (room) => {
	const sourceInfos = {};
	room.find(FIND_SOURCES).every((source) => {
		sourceInfos[source.id] = MemoryManager.initSourceInfo(source);
	});

	return sourceInfos;
};

MemoryManager.initSourceInfo = (source) => {
	const roomName = source.room.name;
	const x = source.pos.x;
	const y = source.pos.y;

	const testPoints = [
		new RoomPosition(x + 1, y + 1, roomName),
		new RoomPosition(x + 1, y, roomName),
		new RoomPosition(x + 1, y - 1, roomName),
		new RoomPosition(x, y + 1, roomName),
		new RoomPosition(x, y - 1, roomName),
		new RoomPosition(x - 1, y + 1, roomName),
		new RoomPosition(x - 1, y, roomName),
		new RoomPosition(x - 1, y - 1, roomName),
	];

	const sourceInfo = {
		accessPoints: {}
	};

	testPoints.every((pos, idx) => {
		if ('wall' !== Game.map.getTerrainAt(pos.x, pos.y, roomName)) {
			sourceInfo.accessPoints[idx] = {
				pos: pos
			};
		}
	});

	return sourceInfo;
};

// MemoryManager.initSources = function() {
//   if (!Memory.my) {
//     Memory.my = {};
//   }
//
//   if (!Memory.my.sourceInfos) {
//     Memory.my.sourceInfos = {};
//     Game.spawns['Spawn1'].room.find(FIND_SOURCES).forEach((source) => {
//       Memory.my.sourceInfos[source.id] = new SourceInfo();
//     });
//   }
// }

module.exports = MemoryManager;
