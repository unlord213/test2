'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const UpgradeControllerActionInfo = require('./UpgradeControllerActionInfo');
const TransferActionInfo = require('./TransferActionInfo');
const MemoryManager = require('./MemoryManager');

class Harvester {
	constructor(creep) {
		this.creep = creep;
	}

	run() {
		// TODO: check returns?
		// TODO: break into HarvestAction, IdleAction, UpgradeAction, etc
		let actionInfo = this.creep.memory.actionInfo;
		const actionInfoId = actionInfo.id;

		switch (actionInfoId) {
			case IdleActionInfo.id:
				if (actionInfo.full) {
					actionInfo = this.findEnergyTransfer();
					return;
				}

				this.findSource();
				return;
			case HarvestActionInfo.id:
				this.harvest(actionInfo);
				return;
			case UpgradeControllerActionInfo.id:
				this.upgradeController(actionInfo);
				return;
			case TransferActionInfo.id:
				this.transfer(actionInfo);
				return;
			default:
				return;
		}
	}

	findEnergyTransfer() {
		const creep = this.creep;
		const room = creep.room;
		const roomName = room.name;

		const roomInfo = MemoryManager.getRoomInfo(roomName);
		if (!roomInfo.upgradeCreepId) {
			roomInfo.upgradeCreepId = creep.id;
			return new UpgradeControllerActionInfo(room.controller.id);
		}

		const structureId = MemoryManager.findStructureNeedingEnergy(room, creep.energy, creep.id);
		if (structureId) {
			return new TransferActionInfo(structureId);
		}

		return new UpgradeControllerActionInfo(room.controller.id);
	}

	findSource() {
		const creep = this.creep;
		const roomName = creep.room.name;

		const openAccessPoint = MemoryManager.getOpenAccessPoint(roomName, creep.id);

		if (openAccessPoint) {
			const actionInfo = new HarvestActionInfo(openAccessPoint.sourceId, openAccessPoint.accessPointId);
			creep.memory.actionInfo = actionInfo;
			return;
		}

		/*eslint-disable no-console */
		console.log(creep.name + ' has nowhere to go');
		const targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType === STRUCTURE_SPAWN);
			}
		});
		creep.moveTo(targets[0], Harvester.visualize);
	}

	harvest(actionInfo) {
		const creep = this.creep;
		const roomName = creep.room.name;
		const sourceId = actionInfo.sourceId;
		const accessPointId = actionInfo.accessPointId;
		const accessPoint = MemoryManager.getAccessPoint(roomName, sourceId, accessPointId);

		if (_.sum(creep.carry) === creep.carryCapacity) {
			accessPoint.creepId = null;
			creep.memory.actionInfo = new IdleActionInfo(true);
			return;
		}

		const source = Game.getObjectById(actionInfo.sourceId);

		if (actionInfo.harvesting) {
			creep.harvest(source);
			return;
		}

		if (creep.pos.x === accessPoint.pos.x && creep.pos.y === accessPoint.pos.y) {
			accessPoint.creepId = creep.id;
			actionInfo.harvesting = true;

			creep.harvest(source);
			return;
		}

		creep.moveTo(new RoomPosition(accessPoint.pos.x, accessPoint.pos.y, roomName), Harvester.visualize);
	}

	upgradeController(actionInfo) {
		const creep = this.creep;

		if (0 === creep.carry.energy) {
			creep.memory.actionInfo = new IdleActionInfo(false);
			return;
		}

		const controller = Game.getObjectById(actionInfo.sourceId);
		if (actionInfo.upgrading) {
			creep.upgradeController(controller);
			return;
		}

		const result = creep.upgradeController(controller);
		if (OK === result) {
			actionInfo.upgrading = true;
		}

		if (ERR_NOT_IN_RANGE === result) {
			creep.moveTo(controller, Harvester.visualize);
		}
	}

	transfer(actionInfo) {
		const creep = this.creep;

		if (0 === creep.carry.energy) {
			creep.memory.actionInfo = new IdleActionInfo(false);
			return;
		}

		const structure = Game.getObjectById(actionInfo.sourceId);
		if (actionInfo.transfering) {
			creep.transfer(structure);
			return;
		}

		const result = creep.transfer(structure);
		if (OK === result) {
			actionInfo.upgrading = true;
		}

		if (ERR_NOT_IN_RANGE === result) {
			creep.moveTo(structure, Harvester.visualize);
		}
	}
}

Harvester.visualize = {
	visualizePathStyle: {
		stroke: '#ffffff'
	}
};

module.exports = Harvester;
