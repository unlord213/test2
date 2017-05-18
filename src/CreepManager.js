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
		switch (creep.memory.role) {
			case Roles.WORKER:
				if (!creep.spawning) {
					// TODO: refactor to prevent this being checked twice (here and Worker.run())
					if (IdleActionInfo.id === creep.memory.actionInfo.id) {
						// TODO: refactor to prevent this from being called twice (here and HarvestAction.run())
						const energyManager = EnergyManager.create(MemoryManager.getRoomInfo(creep.room.name));
						const newActionInfo = CreepManager.findJob(creep, energyManager);
						if (newActionInfo) {
							creep.memory.actionInfo = newActionInfo;
						}
					}

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
	let actionInfo = creep.memory.actionInfo;

	if (actionInfo.full) {
		return CreepManager._findEnergyTarget(creep, energyManager);
	}

	return CreepManager._findSource(creep, energyManager);
};

CreepManager._findSource = (creep, energyManager) => {
	const openAccessPoint = energyManager.getOpenAccessPoint(creep.name);

	if (openAccessPoint) {
		return new HarvestActionInfo(openAccessPoint.sourceId, openAccessPoint.accessPointId);
	}
};

CreepManager._findEnergyTarget = (creep, energyManager) => {
	const room = creep.room;
	const roomInfo = MemoryManager.getRoomInfo(room.name);

	if (!roomInfo.upgradeCreepId) {
		roomInfo.upgradeCreepId = creep.name;
		return new UpgradeControllerActionInfo(room.controller.id);
	}

	const structureId = energyManager.findStructureNeedingEnergy(creep.carry.energy, creep.name);
	if (structureId) {
		return new TransferActionInfo(structureId);
	}

	return new UpgradeControllerActionInfo(room.controller.id);
};

module.exports = CreepManager;
