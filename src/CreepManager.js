'use strict';

const Worker = require('./Worker');
const Roles = require('./Roles');
const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const UpgradeControllerActionInfo = require('./UpgradeControllerActionInfo');
const TransferActionInfo = require('./TransferActionInfo');
const MemoryManager = require('./MemoryManager');
const EnergyManager = require('./EnergyManager');

class CreepManager {}

CreepManager.run = () => {
	_.forIn(Game.creeps, (creep) => {
		// console.log('-----------------------------------------------');
		// console.log(creep.name + ' starting');
		switch (creep.memory.role) {
			case Roles.WORKER:
				// console.log(creep.name + ' is a worker');
				if (creep.spawning) {
					// console.log(creep.name + ' is spawning');
				}

				if (!creep.spawning) {
					// TODO: refactor to prevent this being checked twice (here and Worker.run())
					if (IdleActionInfo.id === creep.memory.actionInfo.id) {
						// console.log(creep.name + ' is idle, look for new action');
						// TODO: refactor to prevent this from being called twice (here and HarvestAction.run())
						const energyManager = EnergyManager.create(MemoryManager.getRoomInfo(creep.room.name));
						const newActionInfo = CreepManager.findJob(creep, energyManager);
						if (newActionInfo) {
							// console.log(creep.name + ' found new action');
							creep.memory.actionInfo = newActionInfo;
						}
					}

					// console.log(creep.name + ' running');
					Worker.create(creep).run();
				}
				break;
			default:
				/*eslint-disable no-console */
				console.log('Unknown creep role: ' + creep.memory.role);
		}
	});
};

CreepManager.findJob = (creep, energyManager) => {
	// console.log(creep.name + ' finding job');
	let actionInfo = creep.memory.actionInfo;

	if (actionInfo.full) {
		// console.log(creep.name + ' full, looking for energy target');
		return CreepManager._findEnergyTarget(creep, energyManager);
	}

	// console.log(creep.name + ' looking for energy source');
	return CreepManager._findSource(creep, energyManager);
};

CreepManager._findSource = (creep, energyManager) => {
	const openAccessPoint = energyManager.getOpenAccessPoint(creep.name);

	if (openAccessPoint) {
		// console.log(creep.name + ' found open access point');
		return new HarvestActionInfo(openAccessPoint.sourceId, openAccessPoint.accessPointId);
	}

	console.log('no open access points');
};

CreepManager._findEnergyTarget = (creep, energyManager) => {
	// console.log(creep.name + ' finding energy target');
	const room = creep.room;

	const roomInfo = MemoryManager.getRoomInfo(room.name);
	console.log('room ' + room.name + ' has ' + roomInfo.numWorkers + '/' + roomInfo.maxWorkers + ' workers');
	// if (roomInfo.numWorkers < 3) {
	// 	const structureId = energyManager.findStructureNeedingEnergy(creep.carry.energy, creep.name);
	// 	if (structureId) {
	// 		console.log('less than 3 workers, transfer to ' + structureId);
	// 		return new TransferActionInfo(structureId);
	// 	}
	// }

	if (!roomInfo.upgradeCreepId) {
		console.log('no upgrade creep, upgrade controller');
		roomInfo.upgradeCreepId = creep.name;
		return new UpgradeControllerActionInfo(room.controller.id);
	}

	const structureId = energyManager.findStructureNeedingEnergy(creep.carry.energy, creep.name);
	if (structureId) {
		console.log(structureId + ' needs energy, transfer');
		return new TransferActionInfo(structureId);
	}

	console.log('fall through to upgrade controller');
	return new UpgradeControllerActionInfo(room.controller.id);
};

module.exports = CreepManager;
