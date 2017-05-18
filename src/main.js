'use strict';

const MemoryManager = require('./MemoryManager');
const StructureManager = require('./StructureManager');
const CreepManager = require('./CreepManager');
const Reporter = require('./Reporter');

// TODO: so many statics is a smell ....
// TODO: use folders
module.exports.loop = function() {
	MemoryManager.initRoomInfos();
	MemoryManager.updateSpawns();

	if (Game.time % 20 === 0) {
		MemoryManager.cleanup();
	}

	StructureManager.run();
	CreepManager.run();

	if (Game.time % 50 === 0) {
		Reporter.report();
	}

	if (Game.time % 20 === 0) {
		console.log('Memory dump:' + JSON.stringify(Memory));
	}
};
