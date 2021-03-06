'use strict';

const IdleActionInfo = require('./IdleActionInfo');
// const Worker = require('./Worker');
const MemoryManager = require('./MemoryManager');
const EnergyManager = require('./EnergyManager');

class HarvestAction {}

HarvestAction.run = (creep) => {
	const actionInfo = creep.memory.actionInfo;
	const sourceId = actionInfo.sourceId;

	const energyManager = EnergyManager.create(MemoryManager.getRoomInfo(creep.room.name));
	const accessPoint = energyManager.getAccessPoint(sourceId, actionInfo.accessPointId);

	if (_.sum(creep.carry) === creep.carryCapacity) {
		accessPoint.creepName = null;
		creep.memory.actionInfo = new IdleActionInfo(true);
		return;
	}

	const source = Game.getObjectById(actionInfo.sourceId);

	if (actionInfo.harvesting) {
		creep.harvest(source);
		return;
	}

	if (creep.pos.x === accessPoint.pos.x && creep.pos.y === accessPoint.pos.y) {
		accessPoint.creepName = creep.name;
		actionInfo.harvesting = true;

		creep.harvest(source);
		return;
	}

	const pos = new RoomPosition(accessPoint.pos.x, accessPoint.pos.y, creep.room.name);
	// creep.moveTo(pos, Worker.visualize);
	creep.moveTo(pos, {
		visualizePathStyle: {
			stroke: '#ffffff'
		}
	});
};

module.exports = HarvestAction;
