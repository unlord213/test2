"use strict";

class SourceManager {}
SourceManager.getOpenAccessPoint = function() {
  for (const sourceId of Object.keys(Memory.my.sourceInfos)) {
    const sourceInfo = Memory.my.sourceInfos[sourceId];

    for (const accessPointId of Object.keys(sourceInfo.accessPoints)) {
      const accessPoint = sourceInfo.accessPoints[accessPointId];

      if (!accessPoint.creepId) {
        return {
          sourceId: sourceId,
          accessPointId: accessPointId
        };
      }
    };
  };
}

SourceManager.getUnmappedSource = function() {
  for (const sourceId of Object.keys(Memory.my.sourceInfos)) {
    const sourceInfo = Memory.my.sourceInfos[sourceId];
    if (!sourceInfo.mapped) {
      return sourceInfo.id;
    }
  }
}

SourceManager.getAccesPointPosition = function(sourceId, accessPointId) {
  const sourceInfo = Memory.my.sourceInfos[sourceId];
  if (!sourceInfo) {
    return;
  }

  const accessPoint = sourceInfo.accessPoints[accessPointId];
  if (!accessPoint) {
    return;
  }

  return accessPoint.roomPosition;
}

SourceManager.getAccessPointId = function(sourceId, pos) {
  const accessPoints = Memory.my.sourceInfos[sourceId].accessPoints;
    for (const accessPointId of Object.keys(accessPoints)) {
      const accessPoint = accessPoints[accessPointId];
      if(_.isEqual(accessPoint.roomPoisition, pos)) {
        return accessPointId;
      }
    }
}

SourceManager.getSourceInfo = function(sourceId) {
  return Memory.my.sourceInfos[sourceId];
}

SourceManager.getSource = function(sourceId) {
  return Game.getObjectById(sourceId);
}

module.exports = SourceManager;
