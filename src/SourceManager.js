'use strict';

class SourceManager {}
SourceManager.getAccessPoint = (roomName, sourceId, accessPointId) => {
	return Memory.roomInfos[roomName].sourceInfos[sourceId].accessPoints[accessPointId];
};

SourceManager.getSource = (sourceId) => {
	return Game.getObjectById(sourceId);
};

SourceManager.getOpenAccessPoint = (roomName) => {
	const sourceInfos = Memory.roomInfos[roomName].sourceInfos;
	for (const sourceId of Object.keys(sourceInfos)) {
		const accessPoints = sourceInfos[sourceId].accessPoints;

		for (const accessPointId of Object.keys(accessPoints)) {
			if (!accessPoints[accessPointId].creepId) {
				return {
					sourceId: sourceId,
					accessPointId: accessPointId
				};
			}
		}
	}
};

// SourceManager.getUnmappedSource = function() {
// 	for (const sourceId of Object.keys(Memory.my.sourceInfos)) {
// 		const sourceInfo = Memory.my.sourceInfos[sourceId];
// 		if (!sourceInfo.mapped) {
// 			return sourceInfo.id;
// 		}
// 	}
// };
//
// SourceManager.getAccesPointPosition = function(sourceId, accessPointId) {
// 	const sourceInfo = Memory.my.sourceInfos[sourceId];
// 	if (!sourceInfo) {
// 		return;
// 	}
//
// 	const accessPoint = sourceInfo.accessPoints[accessPointId];
// 	if (!accessPoint) {
// 		return;
// 	}
//
// 	return accessPoint.roomPosition;
// };
//
// SourceManager.getAccessPointId = function(sourceId, pos) {
// 	const accessPoints = Memory.my.sourceInfos[sourceId].accessPoints;
// 	for (const accessPointId of Object.keys(accessPoints)) {
// 		const accessPoint = accessPoints[accessPointId];
// 		if (_.isEqual(accessPoint.roomPoisition, pos)) {
// 			return accessPointId;
// 		}
// 	}
// };
//
// SourceManager.getSourceInfo = function(sourceId) {
// 	return Memory.my.sourceInfos[sourceId];
// };

module.exports = SourceManager;
