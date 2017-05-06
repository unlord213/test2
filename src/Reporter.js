'use strict';

class Reporter {}
Reporter.report = () => {
	/*eslint-disable no-console */
	console.log('<span style="color:rgba(198, 120, 221, 1.0)">' + Game.time + ' </span>');

	console.log('<span style="color:rgba(210, 127, 50, 1.0)">Room Infos</span>');
	console.log(JSON.stringify(Memory.roomInfos, null, 2));

	console.log('<span style="color:rgba(210, 127, 50, 1.0)">Creeps</span>');
	for (const creep of Object.keys(Game.creeps)) {
		console.log(creep.name + '-' + JSON.stringify(creep.memory.actionInfo, null, 2));
	}
};

module.exports = Reporter;
