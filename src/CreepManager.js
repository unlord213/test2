'use strict';

const Worker = require('./Worker');
const Roles = require('./Roles');
const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const UpgradeControllerActionInfo = require('./UpgradeControllerActionInfo');
const TransferActionInfo = require('./TransferActionInfo');

class CreepManager {}

CreepManager.run = () => {
	_.forIn(Game.creeps, (creep) => {
		switch (creep.memory.role) {
			case Roles.WORKER:
				if (!creep.spawning) {
					CreepManager._runWorker(creep.memory.actionInfo.id, Worker.create(creep));
				}
				break;
			default:
				/*eslint-disable no-console */
				console.log('Unknown creep role: ' + creep.memory.role);
		}
	});
};

CreepManager._runWorker = (actionId, worker) => {
	// TODO: check returns?
	switch (actionId) {
		case IdleActionInfo.id:
			worker.findJob();
			return;
		case HarvestActionInfo.id:
			worker.harvest();
			return;
		case UpgradeControllerActionInfo.id:
			worker.upgradeController();
			return;
		case TransferActionInfo.id:
			worker.transfer();
			return;
		default:
			/*eslint-disable no-console */
			console.log('Unknown action id: ' + actionId);
	}
};

module.exports = CreepManager;
