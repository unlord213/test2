"use strict";

require('./lib/common.js');

const IdleActionInfo = require('../src/IdleActionInfo');
const HarvestActionInfo = require('../src/HarvestActionInfo');
const Harvester = require("../src/Harvester");
const SourceInfo = require("../src/SourceInfo");
// const RoomPosition = require("../src/RoomPosition");

let creep;
let harvester;
const sourceId = 'foobar';

desc("Harvester", function() {
  beforeEach(function() {
    creep = {
      carry: [0],
      carryCapacity: 1,
      memory: {
        actionInfo: {
          sourceId: sourceId
        }
      },
      harvest: sinon.stub(),
      moveTo: sinon.stub()
    };

    harvester = new Harvester(creep);

    Memory.my = {};
  });

  desc("test", function() {
    it("should", function() {
      Memory.my.sourceInfos = {
        'sourceid1': {
          'mapped': true,
          'accessPoints': {
            '0': {
              roomPosition: new RoomPosition(0, 0, 'name'),
              creepId: 'creepId1'
            },
            '1': {
              roomPosition: new RoomPosition(0, 1, 'name'),
              creepId: null
            }
          }
        },
        'sourceid2': {
          'mapped': false,
          'accessPoints': {
            '0': {
              roomPosition: new RoomPosition(0, 0, 'name'),
              creepId: null
            }
          }
        }
      }

      harvester.findTarget();
    })
  })

  // describe("harvest", function() {
  //   const pos = {
  //     foo: 'bar'
  //   };
  //
  //   it("creep should stop harvesting then carry is full", function() {
  //     creep.carry = [1];
  //     creep.carryCapacity = 1;
  //
  //     harvester.harvest();
  //
  //     expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(true));
  //     expect(creep.harvest).to.not.have.been.called;
  //     expect(creep.moveTo).to.not.have.been.called;
  //   });
  //
  //   it("should harvest if at source", function() {
  //     const source = {
  //       bar: 'foo'
  //     };
  //
  //     const getObjectById = sandbox.stub(Game, "getObjectById");
  //     getObjectById.returns(source);
  //
  //     creep.pos = pos;
  //     creep.memory.actionInfo.position = pos;
  //
  //     harvester.harvest();
  //
  //     expect(Game.getObjectById).to.have.been.calledWith(sourceId);
  //     expect(creep.harvest).to.have.been.calledWith(source);
  //     expect(creep.moveTo).to.not.have.been.called;
  //   });
  //
  //   it("should move to action position", function() {
  //     const pos2 = {
  //       bar: 'foo'
  //     };
  //
  //     creep.pos = pos;
  //     creep.memory.actionInfo.position = pos2;
  //
  //     harvester.harvest();
  //
  //     expect(creep.harvest).to.not.have.been.called;
  //     expect(creep.moveTo).to.have.been.calledWith(pos2);
  //   });
  //
  //   it("should move to source", function() {
  //     const source = {
  //       bar: 'foo'
  //     };
  //
  //     const getObjectById = sandbox.stub(Game, "getObjectById");
  //     getObjectById.returns(source);
  //
  //     creep.pos = pos;
  //
  //     harvester.harvest();
  //
  //     expect(creep.harvest).to.not.have.been.called;
  //     expect(creep.moveTo).to.have.been.calledWith(source);
  //   });
  // });
  //
  // desc("findTarget", function() {
  //   beforeEach(function() {
  //     Memory.my = {
  //       sourceInfos: new Map()
  //     }
  //   })
  //
  //   it("should set action if source has open slot", function() {
  //     const sourceInfo = new SourceInfo();
  //     sourceInfo.mapped = true;
  //
  //     const openSpot1 = {
  //       foo: 'bar'
  //     };
  //     sourceInfo.openSpots.push(openSpot1);
  //
  //     const openSpot2 = {
  //       foo: 'bar2'
  //     };
  //     sourceInfo.openSpots.push(openSpot2);
  //
  //     Memory.my.sourceInfos = new Map();
  //     Memory.my.sourceInfos.set(sourceId, sourceInfo);
  //
  //     harvester.findTarget();
  //
  //     expect(creep.memory.actionInfo).to.eql(new HarvestActionInfo(sourceId, openSpot1, false));
  //     expect(sourceInfo.openSpots).to.eql([openSpot2]);
  //   })
  //
  //   it("should set action if source has no open slots and not been mapped", function() {
  //     const sourceInfo = new SourceInfo();
  //     sourceInfo.mapped = false;
  //
  //     Memory.my.sourceInfos = new Map();
  //     Memory.my.sourceInfos.set(sourceId, sourceInfo);
  //
  //     harvester.findTarget();
  //
  //     expect(creep.memory.actionInfo).to.eql(new HarvestActionInfo(sourceId, null, false));
  //     expect(sourceInfo.openSpots).to.eql([]);
  //   })
  //
  //   it("should move to spawn if nowhere else to go", function() {
  //     const sourceInfo = new SourceInfo();
  //     sourceInfo.mapped = false;
  //
  //     Memory.my.sourceInfos = new Map();
  //     Memory.my.sourceInfos.set(sourceId, sourceInfo);
  //
  //     harvester.findTarget();
  //
  //     expect(creep.memory.actionInfo).to.eql(new HarvestActionInfo(sourceId, null, false));
  //     expect(sourceInfo.openSpots).to.eql([]);
  //   })
  // });
  //
  // desc("run", function() {
  //   it("should find target if idle", function() {
  //     creep.memory.actionInfo.id = IdleActionInfo.id;
  //
  //     const harvestSpy = sandbox.stub(harvester, "harvest");
  //     const findTargetSpy = sandbox.stub(harvester, "findTarget");
  //
  //     harvester.run();
  //
  //     expect(findTargetSpy).to.have.been.called;
  //     expect(harvestSpy).to.not.have.been.called;
  //   });
  //
  //   it("should harvset if not idle", function() {
  //     creep.memory.actionInfo.id = HarvestActionInfo.id;
  //
  //     const harvestSpy = sandbox.stub(harvester, "harvest");
  //     const findTargetSpy = sandbox.stub(harvester, "findTarget");
  //
  //     harvester.run();
  //
  //     expect(findTargetSpy).to.not.have.been.called;
  //     expect(harvestSpy).to.have.been.called;
  //   });
  // });
});
