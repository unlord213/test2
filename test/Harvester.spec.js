'use strict';

require('./lib/common.js');

const IdleActionInfo = require('../src/IdleActionInfo');
const HarvestActionInfo = require('../src/HarvestActionInfo');
const Harvester = require('../src/Harvester');
const SourceManager = require('../src/SourceManager');
const Position = require('../src/Position');

let creep;
let harvester;
const sourceId = 'sourceId0';
const roomName = 'roomName0';
const creepId = 'creepId0';

desc('Harvester', () => {
	beforeEach(() => {
		creep = {
			id: creepId,
			name: 'cname',
			carry: [0],
			carryCapacity: 1,
			pos: {},
			memory: {
				actionInfo: {
					sourceId: sourceId
				}
			},
			room: {
				name: roomName
			},
			harvest: sinon.stub(),
			moveTo: sinon.stub()
		};

		harvester = new Harvester(creep);
	});

	desc('run', () => {
		let findSource;
		let harvest;

		beforeEach(() => {
			findSource = sandbox.stub(harvester, 'findSource');
			harvest = sandbox.stub(harvester, 'harvest');
		});

		it('should find source if not full', () => {
			creep.memory.actionInfo.id = IdleActionInfo.id;
			creep.memory.actionInfo.full = false;

			harvester.run();

			expect(findSource).to.have.been.called;
			expect(harvest).to.not.have.been.called;
		});

		it('should do nothing if full', () => {
			creep.memory.actionInfo.id = IdleActionInfo.id;
			creep.memory.actionInfo.full = true;

			harvester.run();

			expect(findSource).to.not.have.been.called;
			expect(harvest).to.not.have.been.called;
		});

		it('should harvest', () => {
			creep.memory.actionInfo.id = HarvestActionInfo.id;
			harvester.run();

			expect(findSource).to.not.have.been.called;
			expect(harvest).to.have.been.called;
		});
	});

	desc('harvest', () => {
		let sourceId;
		let accessPointId;
		let actionInfo;
		let accessPoint;
		let source;

		beforeEach(() => {
			sourceId = 'sourceId0';
			accessPointId = '0';
			actionInfo = {
				sourceId: sourceId,
				accessPointId: accessPointId
			};

			accessPoint = {
				pos: {}
			};
			sandbox.stub(SourceManager, 'getAccessPoint').returns(accessPoint);

			source = {bar: 'foo'};
			sandbox.stub(SourceManager, 'getSource').returns(source);
		});

		it('should get access point', () => {
			harvester.harvest(actionInfo);
			expect(SourceManager.getAccessPoint).to.have.been.calledWith(roomName, sourceId, accessPointId);
		});

		it('should stop harvesting', () => {
			creep.carry = [1];
			creep.carryCapacity = 1;

			harvester.harvest(actionInfo);

			expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(true));
			expect(SourceManager.getSource).to.not.have.been.called;
			expect(creep.harvest).to.not.have.been.called;
			expect(creep.moveTo).to.not.have.been.called;
		});

		it('should keep harvesting', () => {
			actionInfo.harvesting = true;

			harvester.harvest(actionInfo);

			expect(creep.harvest).to.have.been.calledWith(source);
			expect(creep.moveTo).to.not.have.been.called;
		});

		it('should start harvesting if at access point', () => {
			actionInfo.harvesting = false;

			creep.pos = new Position(42, 43);
			accessPoint.pos = new Position(42, 43);

			harvester.harvest(actionInfo);

			expect(accessPoint.creepId).to.eql(creepId);
			expect(actionInfo.harvesting).to.eql(true);
			expect(creep.harvest).to.have.been.calledWith(source);
			expect(creep.moveTo).to.not.have.been.called;
		});

		it('should move to source', () => {
			actionInfo.harvesting = false;

			creep.pos = new Position(42, 43);
			accessPoint.pos = new Position(24, 25);

			harvester.harvest(actionInfo);

			expect(creep.moveTo).to.have.been.calledWith(source);
			expect(creep.harvest).to.not.have.been.called;
		});
	});

	desc('findSource', () => {
		let getOpenAccessPoint;

		beforeEach(() => {
			getOpenAccessPoint = sandbox.stub(SourceManager, 'getOpenAccessPoint');
		});

		it('should find open access point', () => {
			const accessPointId = '0';
			const openAccessPoint = {
				sourceId: sourceId,
				accessPointId: accessPointId
			};
			getOpenAccessPoint.returns(openAccessPoint);

			harvester.findSource();

			expect(SourceManager.getOpenAccessPoint).to.have.been.called;
			expect(creep.memory.actionInfo).to.eql(new HarvestActionInfo(sourceId, accessPointId));
		});

		it('should move to spawn', () => {
			const spawn = {
				foo: 'bar'
			};
			Game.structures['Spawn1'] = spawn;

			sandbox.stub(console, 'log');

			getOpenAccessPoint.returns(undefined);

			harvester.findSource();

			expect(SourceManager.getOpenAccessPoint).to.have.been.called;
			expect(creep.moveTo).to.have.been.calledWith(spawn);
			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith(creep.name + ' has nowhere to go');
		});
	});

	// describe('harvest', function() {
	//   const pos = {
	//     foo: 'bar'
	//   };
	//
	//
	//   it('should harvest if at source', function() {
	//     const source = {
	//       bar: 'foo'
	//     };
	//
	//     const getObjectById = sandbox.stub(Game, 'getObjectById');
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
	//   it('should move to action position', function() {
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
	//   it('should move to source', function() {
	//     const source = {
	//       bar: 'foo'
	//     };
	//
	//     const getObjectById = sandbox.stub(Game, 'getObjectById');
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
	// desc('findTarget', function() {
	//   beforeEach(function() {
	//     Memory.my = {
	//       sourceInfos: new Map()
	//     }
	//   })
	//
	//   it('should set action if source has open slot', function() {
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
	//   it('should set action if source has no open slots and not been mapped', function() {
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
	//   it('should move to spawn if nowhere else to go', function() {
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
	// desc('run', function() {
	//   it('should find target if idle', function() {
	//     creep.memory.actionInfo.id = IdleActionInfo.id;
	//
	//     const harvestSpy = sandbox.stub(harvester, 'harvest');
	//     const findTargetSpy = sandbox.stub(harvester, 'findTarget');
	//
	//     harvester.run();
	//
	//     expect(findTargetSpy).to.have.been.called;
	//     expect(harvestSpy).to.not.have.been.called;
	//   });
	//
	//   it('should harvset if not idle', function() {
	//     creep.memory.actionInfo.id = HarvestActionInfo.id;
	//
	//     const harvestSpy = sandbox.stub(harvester, 'harvest');
	//     const findTargetSpy = sandbox.stub(harvester, 'findTarget');
	//
	//     harvester.run();
	//
	//     expect(findTargetSpy).to.not.have.been.called;
	//     expect(harvestSpy).to.have.been.called;
	//   });
	// });
});
