'use strict';

class EnergyManager {
	constructor(roomInfo) {
		this.energyStructureInfos = roomInfo.energyStructureInfos;
		this.sourceInfos = roomInfo.sourceInfos;
	}

	findStructureNeedingEnergy(energy, creepName) {
		const structureInfos = this.energyStructureInfos.spawns;
		for (const structureId of Object.keys(structureInfos)) {
			const structureInfo = structureInfos[structureId];

			if (structureInfo.needsEnergy) {
				structureInfo.transfers[creepName] = energy;

				let sum = structureInfo.energy + energy;
				for (const transferCreepName of Object.keys(structureInfo.transfers)) {
					sum += structureInfo.transfers[transferCreepName];
				}

				if (sum >= structureInfo.energyCapacity) {
					structureInfo.needsEnergy = false;
				}

				return structureId;
			}
		}
	}

	getAccessPoint(sourceId, accessPointId) {
		return this.sourceInfos[sourceId].accessPoints[accessPointId];
	}

	getOpenAccessPoint(creepName) {
		const sourceInfos = this.sourceInfos;
		for (const sourceId of Object.keys(sourceInfos)) {
			const accessPoints = sourceInfos[sourceId].accessPoints;

			for (const accessPointId of Object.keys(accessPoints)) {
				if (!accessPoints[accessPointId].creepName) {
					accessPoints[accessPointId].creepName = creepName;
					return {
						sourceId: sourceId,
						accessPointId: accessPointId
					};
				}
			}
		}
	}
}

// TODO: find way to latch onto constructor in tests and remove this method
EnergyManager.create = (roomInfo) => {
	return new EnergyManager(roomInfo);
};

module.exports = EnergyManager;
