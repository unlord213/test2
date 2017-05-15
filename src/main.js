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

	StructureManager.run();
	CreepManager.run();

	if (Game.time % 20 === 0) {
		Reporter.report();
	}
};
