'use strict';

const MemoryManager = require('./MemoryManager');

class Reporter {}
Reporter.report = () => {
	// TODO: add cpu/memory usage
	/*eslint-disable no-console */
	console.log(Reporter.SPAN_PURPLE + 'Tick ' + Game.time + Reporter.SPAN_CLOSE);
	console.log(Object.keys(Game.rooms).length + ' rooms');

	// _.forIn(Game.rooms, (room, roomName) => {
	for (const roomName of Object.keys(Game.rooms)) {
		const roomInfo = MemoryManager.getRoomInfo(roomName);

		if (!roomInfo) {
			continue;
		}

		console.log(Reporter.SPAN_ORANGE + roomName + Reporter.SPAN_CLOSE);
		const spawns = roomInfo.energyStructureInfos.spawns;
		const sources = roomInfo.sourceInfos;

		console.log(Reporter.SPAN_GREEN + Object.keys(spawns).length + ' spawns' + Reporter.SPAN_CLOSE);
		_.forIn(spawns, (structureInfo, structureId) => {
			// TODO: add total energy transfering
			console.log(structureId + ': ' + structureInfo.energy + '/' + structureInfo.energyCapacity + ' energy, ' + Object.keys(structureInfo.transfers).length + ' transfers');
		});

		console.log(Reporter.SPAN_GREEN + Object.keys(sources).length + ' sources' + Reporter.SPAN_CLOSE);
		_.forIn(sources, (sourceInfo, sourceId) => {
			let openAccessPoints = 0;
			_.forIn(sourceInfo.accessPoints, (accessPoint) => {
				if (!accessPoint.creepId) {
					++openAccessPoints;
				}
			});
			console.log(sourceId + ': ' + openAccessPoints + ' open access points');
		});
	}

	console.log(Reporter.SPAN_ORANGE + 'Creeps' + Reporter.SPAN_CLOSE);
	_.forIn(Game.creeps, (creep, creepName) => {
		console.log(creepName + ': ' + JSON.stringify(creep.memory.actionInfo));
	});
};

Reporter.SPAN_PURPLE = '<span style="color:rgba(198, 120, 221, 1)">';
Reporter.SPAN_ORANGE = '<span style="color:rgba(210, 127, 50, 1)">';
Reporter.SPAN_GREEN = '<span style="color:rgba(152, 195, 121, 1)">';
Reporter.SPAN_CLOSE = '</span>';

module.exports = Reporter;
