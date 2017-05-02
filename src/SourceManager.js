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

SourceManager.getAccesPointPosition(sourceId, accessPointId) {
    return Memory.my.sourceInfos[sourceId].accessPoints[accessPointId].roomPosition;
}

SourceManager.getSourceInfo(sourceId) {
  return Memory.my.sourceInfos[sourceId];
}

SourceManager.getSource(sourceId) {
  return Game.getObjectById(sourceId);
}


module.exports = SourceManager;
