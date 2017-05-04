'use strict';

const Position = require('../src/Position');

/**
 *	Memory = {
 *		roomInfos: {
 *			roomName0: {
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

		Memory.roomInfos[roomName] = {
			sourceInfos: MemoryManager.initSourceInfos(room)
		};
	});
};

MemoryManager.initSourceInfos = (room) => {
	const sourceInfos = {};
	for(const source of room.find(FIND_SOURCES)) {
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

	const sourceInfo = {
		accessPoints: {}
	};

	for (const [idx, pos] of testPoints.entries()) {
		console.log(pos, idx);
		if ('wall' !== Game.map.getTerrainAt(pos.x, pos.y, roomName)) {
			sourceInfo.accessPoints[idx] = {
				pos: pos
			};
		}
	}

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
