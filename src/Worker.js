'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const UpgradeControllerActionInfo = require('./UpgradeControllerActionInfo');
const TransferActionInfo = require('./TransferActionInfo');
const HarvestAction = require('./HarvestAction');
const TransferAction = require('./TransferAction');
const UpgradeControllerAction = require('./UpgradeControllerAction');
const Roles = require('./Roles');

class Worker {
	constructor(creep) {
		this.creep = creep;
	}

	run() {
		const actionId = this.creep.memory.actionInfo.id;

		// TODO: check returns?
		// TODO: introduce map of action id to action to remove switches on action id
		switch (actionId) {
			case IdleActionInfo.id:
				this._moveToSpawn();
				return;
			case HarvestActionInfo.id:
				HarvestAction.run(this.creep);
				return;
			case UpgradeControllerActionInfo.id:
				UpgradeControllerAction.run(this.creep);
				return;
			case TransferActionInfo.id:
				TransferAction.run(this.creep);
				return;
			default:
				/*eslint-disable no-console */
				console.log('Unknown action id: ' + actionId);
		}
	}

	_moveToSpawn() {
		const creep = this.creep;

		/*eslint-disable no-console */
		console.log(creep.name + ' has nowhere to go');
		const targets = creep.room.find(FIND_STRUCTURES, Worker.SpawnFilter);
		creep.moveTo(targets[0], {
			visualizePathStyle: {
				stroke: '#ffffff'
			}
		});
	}
}
Worker.Role = Roles.WORKER;

// TODO: move this to different file to prevent circular references
Worker.visualize = {
	visualizePathStyle: {
		stroke: '#ffffff'
	}
};

Worker.SpawnFilter = {
	filter: (structure) => {
		return (structure.structureType === STRUCTURE_SPAWN);
	}
};

// TODO: find way to latch onto constructor in tests and remove this method
Worker.create = (creep) => {
	return new Worker(creep);
};

module.exports = Worker;
