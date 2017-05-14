'use strict';

// const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const UpgradeControllerActionInfo = require('./UpgradeControllerActionInfo');
const TransferActionInfo = require('./TransferActionInfo');
const MemoryManager = require('./MemoryManager');
const EnergyManager = require('./EnergyManager');
const HarvestAction = require('./HarvestAction');
const TransferAction = require('./TransferAction');
const UpgradeControllerAction = require('./UpgradeControllerAction');
const Roles = require('./Roles');

class Worker {
	constructor(creep) {
		this.creep = creep;
		this.energyManager = new EnergyManager(MemoryManager.getRoomInfo(creep.room.name));
	}

	// run() {
	// 	// TODO: check returns?
	// 	// TODO: break into HarvestAction, IdleAction, UpgradeAction, etc
	// 	let actionInfo = this.creep.memory.actionInfo;
	//
	// 	switch (actionInfo.id) {
	// 		case IdleActionInfo.id:
	// 			if (actionInfo.full) {
	// 				actionInfo = this.findEnergyTransfer();
	// 				return;
	// 			}
	//
	// 			this.findSource();
	// 			return;
	// 		case HarvestActionInfo.id:
	// 			this.harvest(actionInfo);
	// 			return;
	// 		case UpgradeControllerActionInfo.id:
	// 			this.perform(actionInfo, 'upgradeController');
	// 			return;
	// 		case TransferActionInfo.id:
	// 			this.perform(actionInfo, 'transfer');
	// 			return;
	// 		default:
	// 			return;
	// 	}
	// }

	findJob() {
		let actionInfo = this.creep.memory.actionInfo;

		if (actionInfo.full) {
			actionInfo = this._findEnergyTransfer();
			return;
		}

		const newActionInfo = this._findSource();
		if (actionInfo) {
			actionInfo = newActionInfo;
			return;
		}

		this._moveToSpawn();
		return;
	}

	harvest() {
		HarvestAction.run(this.creep, this.energyManager);
	}

	upgradeController() {
		UpgradeControllerAction.run(this.creep);
	}

	transfer() {
		TransferAction.run(this.creep);
	}

	_findEnergyTransfer() {
		const creep = this.creep;
		const room = creep.room;

		const roomInfo = MemoryManager.getRoomInfo(room.name);
		if (!roomInfo.upgradeCreepId) {
			roomInfo.upgradeCreepId = creep.id;
			return new UpgradeControllerActionInfo(room.controller.id);
		}

		const structureId = this.energyManager.findStructureNeedingEnergy(creep.energy, creep.id);
		if (structureId) {
			return new TransferActionInfo(structureId);
		}

		return new UpgradeControllerActionInfo(room.controller.id);
	}

	_findSource() {
		const creep = this.creep;
		const openAccessPoint = this.energyManager.getOpenAccessPoint(creep.id);

		if (openAccessPoint) {
			return new HarvestActionInfo(openAccessPoint.sourceId, openAccessPoint.accessPointId);
		}
	}

	_moveToSpawn() {
		const creep = this.creep;

		/*eslint-disable no-console */
		console.log(creep.name + ' has nowhere to go');
		const targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType === STRUCTURE_SPAWN);
			}
		});
		creep.moveTo(targets[0], Worker.visualize);
	}
}
Worker.Role = Roles.WORKER;

Worker.visualize = {
	visualizePathStyle: {
		stroke: '#ffffff'
	}
};

// TODO: find way to latch onto constructor in tests and remove this method
Worker.create = (creep) => {
	return new Worker(creep);
};

module.exports = Worker;
