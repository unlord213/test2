'use strict';

const IdleActionInfo = require('./IdleActionInfo');
// const Worker = require('./Worker');
const MemoryManager = require('./MemoryManager');
const EnergyManager = require('./EnergyManager');

class HarvestAction {}

HarvestAction.run = (creep) => {
	// console.log(creep.name + ' harvest action');
	const actionInfo = creep.memory.actionInfo;
	const sourceId = actionInfo.sourceId;

	const energyManager = EnergyManager.create(MemoryManager.getRoomInfo(creep.room.name));
	const accessPoint = energyManager.getAccessPoint(sourceId, actionInfo.accessPointId);

	// console.log(creep.name + ' has ' + _.sum(creep.carry) + ' energy');
	if (_.sum(creep.carry) === creep.carryCapacity) {
		accessPoint.creepId = null;
		creep.memory.actionInfo = new IdleActionInfo(true);
		return;
	}

	const source = Game.getObjectById(actionInfo.sourceId);

	if (actionInfo.harvesting) {
		// console.log(creep.name + ' continuing to harvest');
		creep.harvest(source);
		return;
	}

	if (creep.pos.x === accessPoint.pos.x && creep.pos.y === accessPoint.pos.y) {

		// console.log(creep.name + ' at harvest position');
		accessPoint.creepId = creep.name;
		actionInfo.harvesting = true;

		creep.harvest(source);
		return;
	}


	// console.log(creep.name + ' moving to position');
	const pos = new RoomPosition(accessPoint.pos.x, accessPoint.pos.y, creep.room.name);
	// console.log('Worker', Object.getOwnPropertyNames(Worker));
	// creep.moveTo(pos, Worker.visualize);
	creep.moveTo(pos, {
		visualizePathStyle: {
			stroke: '#ffffff'
		}
	});
};

module.exports = HarvestAction;
