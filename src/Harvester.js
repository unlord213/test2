'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const SourceManager = require('./SourceManager');

class Harvester {
	constructor(creep) {
		this.creep = creep;
	}

	run() {
		// todo: check returns?
		const actionInfo = this.creep.memory.actionInfo;
		const actionInfoId = actionInfo.id;

		if (actionInfoId === IdleActionInfo.id && !actionInfo.full) {
			this.findSource(actionInfo);
			return;
		}

		if (actionInfoId === HarvestActionInfo.id) {
			this.harvest();
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
		
		if (creep.pos.x === accessPoint.pos.x && creep.pos.y === accessPoint.pos.y ) {
			accessPoint.creepId = creep.id;
			actionInfo.harvesting = true;

			creep.harvest(source);
			return;
		}

		creep.moveTo(source);
	}

	findSource() {
		const creep = this.creep;
		const roomName = creep.room.name;

		const openAccessPoint = SourceManager.getOpenAccessPoint(roomName);

		if (openAccessPoint) {
			const actionInfo = new HarvestActionInfo(openAccessPoint.sourceId, openAccessPoint.accessPointId);
			creep.memory.actionInfo = actionInfo;
			return;
		}

		/*eslint-disable no-console */
		console.log(creep.name + ' has nowhere to go');
		creep.moveTo(Game.structures['Spawn1']);
	}
}

module.exports = Harvester;
