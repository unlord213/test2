'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const UpgradeControllerActionInfo = require('./UpgradeControllerActionInfo');
const TransferActionInfo = require('./TransferActionInfo');
const SourceManager = require('./SourceManager');
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
					actionInfo = this.findAction();
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

	findAction() {
		const creep = this.creep;
		const room = creep.room;
		const roomName = room.name;
		if (!MemoryManager.isControllerBeingUpgraded(roomName)) {
			MemoryManager.setControllerBeingUpgraded(roomName, creep.Id);
			return new UpgradeControllerActionInfo(room.controller.id);
		}

		const structures = SourceManager.findStructuresNeedingEnergy(room);
		const structureId = structures[0].id;
		if (structures.length) {
			MemoryManager.addTransferToStructure(roomName, structureId, creep.id, creep.carry[RESOURCE_ENERGY]);
			return new TransferActionInfo(structureId);
		}

		return new UpgradeControllerActionInfo(room.controller.id);
	}

	harvest(actionInfo) {
		const creep = this.creep;
		const roomName = creep.room.name;
		const sourceId = actionInfo.sourceId;
		const accessPointId = actionInfo.accessPointId;
		const accessPoint = SourceManager.getAccessPoint(roomName, sourceId, accessPointId);

		if (_.sum(creep.carry) === creep.carryCapacity) {
			accessPoint.creepId = null;
			creep.memory.actionInfo = new IdleActionInfo(true);
			return;
		}

		const source = SourceManager.getSource(actionInfo.sourceId);

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

	findSource() {
		const creep = this.creep;
		const roomName = creep.room.name;

		const openAccessPoint = SourceManager.getOpenAccessPoint(roomName, creep.id);

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

	upgradeController() {

	}

	transfer() {

	}
}

Harvester.visualize = {
	visualizePathStyle: {
		stroke: '#ffffff'
	}
};

module.exports = Harvester;
