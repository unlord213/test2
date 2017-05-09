'use strict';

class EnergyManager {
	constructor(roomInfo) {
		this.energyStructureInfos = roomInfo.energyStructureInfos;
		this.sourceInfos = roomInfo.sourceInfos;
	}

	findStructureNeedingEnergy(energy, creepId) {
		const structureInfos = this.energyStructureInfos.spawns;
		for (const structureId of Object.keys(structureInfos)) {
			const structureInfo = structureInfos[structureId];

			if (structureInfo.needsEnergy) {
				let sum = energy;
				for (const transferCreepId of Object.keys(structureInfo.transfers)) {
					sum += structureInfo.transfers[transferCreepId];
				}

				if (sum <= structureInfo.energyCapacity) {
					structureInfo.transfers[creepId] = energy;

					if (sum === structureInfo.energyCapacity) {
						structureInfo.needsEnergy = false;
					}

					return structureId;
				}
			}
		}
	}

	getAccessPoint(sourceId, accessPointId) {
		return this.sourceInfos[sourceId].accessPoints[accessPointId];
	}

	getOpenAccessPoint(creepId) {
		const sourceInfos = this.sourceInfos;
		for (const sourceId of Object.keys(sourceInfos)) {
			const accessPoints = sourceInfos[sourceId].accessPoints;

			for (const accessPointId of Object.keys(accessPoints)) {
				if (!accessPoints[accessPointId].creepId) {
					accessPoints[accessPointId].creepId = creepId;
					return {
						sourceId: sourceId,
						accessPointId: accessPointId
					};
				}
			}
		}
	}
}

module.exports = EnergyManager;
