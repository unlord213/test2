'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const Worker = require('./Worker');

class HarvestAction {}

HarvestAction.run = (creep, energyManager) => {
	const actionInfo = creep.memory.actionInfo;
	const sourceId = actionInfo.sourceId;
	const accessPoint = energyManager.getAccessPoint(sourceId, actionInfo.accessPointId);

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

	const pos = new RoomPosition(accessPoint.pos.x, accessPoint.pos.y, creep.room.name);
	creep.moveTo(pos, Worker.visualize);
};

module.exports = HarvestAction;
