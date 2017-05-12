'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const Roles = require('./Roles');

class StructureManager {}

StructureManager.run = () => {
	_.forIn(Game.structures, (structure) => {
		switch (structure.structureType) {
			case STRUCTURE_SPAWN:
				structure.createCreep([WORK, CARRY, MOVE], undefined, {
					role: Roles.WORKER,
					actionInfo: new IdleActionInfo(false)
				});
				break;
			default:
				/*eslint-disable no-console */
				console.log('Unknown structure type: ' + structure.structureType);
		}
	});
};

module.exports = StructureManager;
