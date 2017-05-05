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

module.exports = SourceManager;
