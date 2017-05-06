'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const SourceManager = require('./SourceManager');

class Harvester {
	constructor(creep) {
		this.creep = creep;
	}

	run() {
		// TODO: check returns?
		// TODO: find action (upgrade controller, put energy in structure, build strucutre)
		// TODO: break into HarvestAction, IdleAction, UpgradeAction, etc
		const actionInfo = this.creep.memory.actionInfo;
		const actionInfoId = actionInfo.id;

		if (actionInfoId === IdleActionInfo.id) {
			if (!actionInfo.full) {
				this.findSource();
				return;
			}

			/*eslint-disable no-console */
			// console.log(this.creep.name + ' has nothing to do');
			// const targets = this.creep.room.find(FIND_STRUCTURES, {
			// 	filter: (structure) => {
			// 		return (structure.structureType === STRUCTURE_SPAWN);
			// 	}
			// });
			// this.creep.moveTo(targets[0]);
			// return;
			return;
		}

		if (actionInfoId === HarvestActionInfo.id) {
			this.harvest(actionInfo);
			return;
		}
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
		// creep.moveTo(Game.structures['Spawn1']);
	}
}

Harvester.visualize = {
	visualizePathStyle: {
		stroke: '#ffffff'
	}
};

module.exports = Harvester;
