'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const Harvester = require('./Harvester');
const MemoryManager = require('./MemoryManager');
const Reporter = require('./Reporter');

module.exports.loop = function() {
	MemoryManager.initRoomInfos();

	Object.keys(Game.structures).forEach((structureId) => {
		const structure = Game.structures[structureId];
		switch (structure.structureType) {
			case STRUCTURE_SPAWN:
				structure.createCreep([WORK, CARRY, MOVE], undefined, {
					actionInfo: new IdleActionInfo(false)
				});
				break;
		}
	});

	Object.keys(Game.creeps).forEach((creepId) => {
		const creep = Game.creeps[creepId];
		if(!creep.spawning) {
			new Harvester(creep).run();
		}
	});

	if (Game.time % 20 === 0) {
		Reporter.report();
	}
};
