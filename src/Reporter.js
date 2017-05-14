'use strict';

class Reporter {}
Reporter.report = () => {
	// TODO: add cpu/memory usage
	/*eslint-disable no-console */

	console.log(Reporter.SPAN_PURPLE + Game.time + Reporter.SPAN_CLOSE);
	console.log(Object.keys(Memory.roomInfos).size + ' rooms');

	_.forIn(Memory.roomInfos, (roomInfo, roomName) => {
		console.log(Reporter.SPAN_ORANGE + roomName + Reporter.SPAN_CLOSE);

		const spawns = roomInfo.energyStructures.spawns;
		const sources = roomInfo.energyStructures.sourceInfos;

		console.log(Object.keys(spawns).length + 'spawns, ' + Object.keys(sources).length + 'source');

		_.forIn(spawns, (structureInfo, structureId) => {
			console.log('spawn ' + structureId + ': needs energy - ' + structureInfo.needsEnergy + ', ' + Object.keys(structureInfo.transfers).length + ' transfers');
		});

		_.forIn(sources, (sourceInfo, sourceId) => {
			const openAccessPoints = _.pickBy(sourceInfo.accessPoints, (accessPoint) => {
				return accessPoint.creepId;
			});

			console.log('source ' + sourceId + ': ' + Object.keys(openAccessPoints).length + ' open access points');
		});
	});

	console.log(Reporter.SPAN_ORANGE + 'Creeps' + Reporter.SPAN_CLOSE);
	_.forIn(Game.creeps, (creep, creepName) => {
		console.log(creepName + ':' + JSON.stringify(creep.memory.actionInfo));
	});
};

Reporter.SPAN_PURPLE = '<span style="color:rgba(198, 120, 221, 1)">';
Reporter.SPAN_ORANGE = '<span style="color:rgba(210, 127, 50, 1)">';
Reporter.SPAN_GREEN = '<span style="color:rgba(152, 195, 121, 1)">';
Reporter.SPAN_CLOSE = '</span>';

module.exports = Reporter;
