'use strict';

require('./lib/common.js');

const IdleActionInfo = require('../src/IdleActionInfo');
const HarvestActionInfo = require('../src/HarvestActionInfo');
const Harvester = require('../src/Harvester');
// const SourceInfo = require('../src/SourceInfo');
const SourceManager = require('../src/SourceManager');

let creep;
let harvester;
const sourceId = 'foobar';

desc('Harvester', () => {
	beforeEach(() => {
		creep = {
			name: 'cname',
			carry: [0],
			carryCapacity: 1,
			memory: {
				actionInfo: {
					sourceId: sourceId
				}
			},
			room: {
				name: 'roomName0'
			},
			harvest: sinon.stub(),
			moveTo: sinon.stub()
		};

		harvester = new Harvester(creep);

		Memory.my = {};
	});

	desc('run', () => {
		let findSource;
		let harvest;

		beforeEach(() => {
			findSource = sandbox.stub(harvester, 'findSource');
			harvest = sandbox.stub(harvester, 'harvest');
		});

		it('should find target', () => {
			creep.memory.actionInfo.id = IdleActionInfo.id;
			harvester.run();

			expect(findSource).to.have.been.called;
			expect(harvest).to.not.have.been.called;
		});

		it('should harvest', () => {
			creep.memory.actionInfo.id = HarvestActionInfo.id;
			harvester.run();

			expect(findSource).to.not.have.been.called;
			expect(harvest).to.have.been.called;
		});
	});

	desc('run', () => {
		let getOpenAccessPoint;
		// let getUnmappedSource;

		beforeEach(() => {
			getOpenAccessPoint = sandbox.stub(SourceManager, 'getOpenAccessPoint');
			// getUnmappedSource = sandbox.stub(SourceManager, 'getUnmappedSource');
		});

		it('should find open access point', () => {
			const sourceId = 'foo';
			const accessPointId = '0';
			const openAccessPoint = {
				sourceId: sourceId,
				accessPointId: accessPointId
			};
			getOpenAccessPoint.returns(openAccessPoint);

			harvester.findSource();

			expect(SourceManager.getOpenAccessPoint).to.have.been.called;
			// expect(SourceManager.getUnmappedSource).to.not.have.been.called;
			expect(creep.memory.actionInfo).to.eql(new HarvestActionInfo(sourceId, accessPointId));
		});

		// it('should find unmapped source', () => {
		// 	const unmappedSourceId = 'foo';
		// 	getUnmappedSource.returns(unmappedSourceId);
		// 	getOpenAccessPoint.returns(undefined);
		//
		// 	harvester.findSource();
		//
		// 	expect(SourceManager.getOpenAccessPoint).to.have.been.called;
		// 	expect(SourceManager.getUnmappedSource).to.have.been.called;
		// 	expect(creep.memory.actionInfo).to.eql(new HarvestActionInfo(unmappedSourceId, null));
		//
		// });

		it('should move to spawn', () => {
			const spawn = {
				foo: 'bar'
			};
			Game.structures['Spawn1'] = spawn;

			sandbox.stub(console, 'log');

			// getUnmappedSource.returns(undefined);
			getOpenAccessPoint.returns(undefined);

			harvester.findSource();

			expect(SourceManager.getOpenAccessPoint).to.have.been.called;
			// expect(SourceManager.getUnmappedSource).to.have.been.called;
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
	//   it('creep should stop harvesting then carry is full', function() {
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
