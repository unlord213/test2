'use strict';

const IdleActionInfo = require('./IdleActionInfo');
const HarvestActionInfo = require('./HarvestActionInfo');
const SourceManager = require('./SourceManager');

class Harvester {
	constructor(creep) {
		this.creep = creep;
	}

	run() {
		if (this.creep.memory.actionInfo.id === IdleActionInfo.id) {
			this.findSource();
			return;
		}

		if (this.creep.memory.actionInfo.id === HarvestActionInfo.id) {
			this.harvest();
			return;
		}
	}

	harvest() {
		const roomName = this.creep.room.name;
		let actionInfo = this.creep.memory.actionInfo;

		if (_.sum(this.creep.carry) === this.creep.carryCapacity) {
			const accessPoint = SourceManager.getAccessPoint(roomName, actionInfo.sourceId, actionInfo.accessPointId);
			accessPoint.creepId = null;

			actionInfo = new IdleActionInfo(true);
			return;
		}

		const source = SourceManager.getSource(actionInfo.sourceId);

		if (actionInfo.harvesting) {
			this.creep.harvest(source);
			return;
		}

		// if (null === actionInfo.accessPointId) {
		// 	const source = SourceManager.getSource(actionInfo.sourceId);
		// 	const returnValue = this.creep.harvest(source);
		//
		// 	if (OK === returnValue) {
		// 		const accessPointId = SourceManager.getAccessPointId(actionInfo.sourceId, this.creep.pos);
		//
		// 		if (!accessPointId) {
		// 			const sourceInfo = SourceManager.getSourceInfo(actionInfo.sourceId);
		// 			const newAccessPointId = Object.keys(sourceInfo).size();
		// 			sourceInfo.accessPoints[newAccessPointId] = {
		// 				roomPoisition: this.creep.pos,
		// 				creepId: this.creep.id
		// 			};
		// 			return;
		// 		}
		//
		// 		const sourceInfo = SourceManager.getSourceInfo(actionInfo.sourceId);
		// 		const prevCreepId = sourceInfo.accessPoints[accessPointId];
		// 		Game.getObjectById(prevCreepId).memory.actionInfo = new IdleActionInfo(false);
		//
		// 		sourceInfo.accessPoints[accessPointId].creepId = this.creep.id;
		// 	}
		//
		// 	if (ERR_NOT_IN_RANGE === returnValue) {
		// 		this.creep.moveTo(source);
		// 		return;
		// 	}
		//
		// 	console.log('Unknown error harvesting:', returnValue);
		// 	return;
		// }

		const accessPoint = SourceManager.getAccesPoint(roomName, actionInfo.sourceId, actionInfo.accessPointId).pos;
		if (this.creep.pos === accessPoint.pos) {
			// const sourceInfo = SourceManager.getSourceInfo(actionInfo.sourceId);
			accessPoint.creepId = this.creep.id;

			actionInfo.harvesting = true;

			// const source = SourceManager.getSource(actionInfo.sourceId);
			// todo: check return?
			this.creep.harvest(source);
			return;
		}

		// if (actionInfo.position) {
		//   this.creep.moveTo(actionInfo.position);
		//   return;
		// }

		// const source = SourceManager.getSource(actionInfo.sourceId);
		this.creep.moveTo(source);
	}

	findSource() {
		const roomName = this.creep.room.name;
		const openAccessPoint = SourceManager.getOpenAccessPoint(roomName);

		if (openAccessPoint) {
			const actionInfo = new HarvestActionInfo(openAccessPoint.sourceId, openAccessPoint.accessPointId);
			this.creep.memory.actionInfo = actionInfo;
			return;
		}

		// const unmappedSourceId = SourceManager.getUnmappedSource();
		// if (unmappedSourceId) {
		// 	const actionInfo = new HarvestActionInfo(unmappedSourceId, null);
		// 	this.creep.memory.actionInfo = actionInfo;
		// 	return;
		// }

		/*eslint-disable no-console */
		console.log(this.creep.name + ' has nowhere to go');
		this.creep.moveTo(Game.structures['Spawn1']);
	}
}

module.exports = Harvester;
