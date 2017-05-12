'use strict';

require('./lib/common.js');

const Worker = require('../src/Worker');
const IdleActionInfo = require('../src/IdleActionInfo');
const HarvestActionInfo = require('../src/HarvestActionInfo');
const UpgradeControllerActionInfo = require('../src/UpgradeControllerActionInfo');
const TransferActionInfo = require('../src/TransferActionInfo');
const MemoryManager = require('../src/MemoryManager');
const EnergyManager = require('../src/EnergyManager');
const Roles = require('../src/Roles');

desc('Worker', () => {
	describe('constructor', () => {
		it('should set properties', () => {});
	});

	describe('findJob', () => {
		it('should find energy transfer', () => {});
		it('should find source', () => {});
		it('should find move to spawn if no source', () => {});
	});

	describe('harvest', () => {
		it('should stop harvesting', () => {});
		it('should keep harvesting', () => {});
		it('should start harvesting', () => {});
		it('should move to access point', () => {});
	});

	describe('perform', () => {
		it('should stop', () => {});
		it('should keep performing', () => {});
		it('should start performing', () => {});
		it('should move to target', () => {});
	});

	describe('_findEnergyTransfer', () => {
		it('should set upgrade controller action if no other creep upgrading', () => {});
		it('should set transfer action', () => {});
		it('should set upgrade controller action', () => {});
	});

	describe('_findSource', () => {
		it('should set harvest action', () => {});
		it('should do nothing if no access points', () => {});
	});

	describe('_moveToSpawn', () => {
		it('should move to spawn', () => {});
	});

	describe('create', () => {
		it('should create', () => {});
	});
});
//
// let creep;
// let worker;
// const sourceId = 'sourceId0';
// const roomName = 'roomName0';
// const creepId = 'creepId0';
//
// 	beforeEach(() => {
// 		creep = {
// 			id: creepId,
// 			name: 'cname',
// 			carry: [0],
// 			carryCapacity: 1,
// 			pos: {},
// 			memory: {
// 				actionInfo: {
// 					sourceId: sourceId
// 				}
// 			},
// 			room: {
// 				name: roomName
// 			},
// 			harvest: sandbox.stub(),
// 			moveTo: sandbox.stub()
// 		};
//
// 		worker = new Worker(creep);
// 	});
//
// desc('run', () => {
// 		beforeEach(() => {
// 			sandbox.stub(worker, 'findEnergyTransfer');
// 			sandbox.stub(worker, 'findSource');
// 			sandbox.stub(worker, 'harvest');
// 			sandbox.stub(worker, 'upgradeController');
// 			sandbox.stub(worker, 'transfer');
// 		});
//
// 		it('should find source if not full', () => {
// 			creep.memory.actionInfo.id = IdleActionInfo.id;
// 			creep.memory.actionInfo.full = false;
//
// 			worker.run();
//
// 			expect(worker.findSource).to.have.been.called;
//
// 			expect(worker.findEnergyTransfer).to.not.have.been.called;
// 			expect(worker.harvest).to.not.have.been.called;
// 			expect(worker.upgradeController).to.not.have.been.called;
// 			expect(worker.transfer).to.not.have.been.called;
// 		});
//
// 		it('should get action if full', () => {
// 			creep.memory.actionInfo.id = IdleActionInfo.id;
// 			creep.memory.actionInfo.full = true;
//
// 			worker.run();
//
// 			expect(worker.findEnergyTransfer).to.have.been.called;
//
// 			expect(worker.findSource).to.not.have.been.called;
// 			expect(worker.harvest).to.not.have.been.called;
// 			expect(worker.upgradeController).to.not.have.been.called;
// 			expect(worker.transfer).to.not.have.been.called;
// 		});
//
// 		it('should harvest', () => {
// 			creep.memory.actionInfo.id = HarvestActionInfo.id;
// 			worker.run();
//
// 			expect(worker.harvest).to.have.been.calledWith(creep.memory.actionInfo);
//
// 			expect(worker.findSource).to.not.have.been.called;
// 			expect(worker.findEnergyTransfer).to.not.have.been.called;
// 			expect(worker.upgradeController).to.not.have.been.called;
// 			expect(worker.transfer).to.not.have.been.called;
// 		});
// });
//
// 	desc('harvest', () => {
// 		let sourceId;
// 		let accessPointId;
// 		let actionInfo;
// 		let accessPoint;
// 		let source;
//
// 		beforeEach(() => {
// 			sourceId = 'sourceId0';
// 			accessPointId = '0';
// 			actionInfo = {
// 				sourceId: sourceId,
// 				accessPointId: accessPointId
// 			};
//
// 			accessPoint = {
// 				pos: {}
// 			};
// 			sandbox.stub(MemoryManager, 'getAccessPoint').returns(accessPoint);
//
// 			source = {
// 				bar: 'foo'
// 			};
// 			sandbox.stub(Game, 'getObjectById').returns(source);
// 		});
//
// 		it('should get access point', () => {
// 			worker.harvest(actionInfo);
// 			expect(MemoryManager.getAccessPoint).to.have.been.calledWith(roomName, sourceId, accessPointId);
// 		});
//
// 		it('should stop harvesting', () => {
// 			creep.carry = [1];
// 			creep.carryCapacity = 1;
//
// 			worker.harvest(actionInfo);
//
// 			expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(true));
// 			expect(Game.getObjectById).to.not.have.been.called;
// 			expect(creep.harvest).to.not.have.been.called;
// 			expect(creep.moveTo).to.not.have.been.called;
// 		});
//
// 		it('should keep harvesting', () => {
// 			actionInfo.harvesting = true;
//
// 			worker.harvest(actionInfo);
//
// 			expect(creep.harvest).to.have.been.calledWith(source);
// 			expect(creep.moveTo).to.not.have.been.called;
// 		});
//
// 		it('should start harvesting if at access point', () => {
// 			actionInfo.harvesting = false;
//
// 			creep.pos = new Position(42, 43);
// 			accessPoint.pos = new Position(42, 43);
//
// 			worker.harvest(actionInfo);
//
// 			expect(accessPoint.creepId).to.eql(creepId);
// 			expect(actionInfo.harvesting).to.eql(true);
// 			expect(creep.harvest).to.have.been.calledWith(source);
// 			expect(creep.moveTo).to.not.have.been.called;
// 		});
//
// 		it('should move to access point', () => {
// 			actionInfo.harvesting = false;
//
// 			creep.pos = new Position(42, 43);
// 			accessPoint.pos = new Position(24, 25);
//
// 			worker.harvest(actionInfo);
//
// 			expect(creep.moveTo).to.have.been.calledWith(new RoomPosition(24, 25, 'roomName0'));
// 			expect(creep.harvest).to.not.have.been.called;
// 		});
// 	});
//
// 	desc('findSource', () => {
// 		let getOpenAccessPoint;
//
// 		beforeEach(() => {
// 			getOpenAccessPoint = sandbox.stub(MemoryManager, 'getOpenAccessPoint');
// 		});
//
// 		it('should find open access point', () => {
// 			const accessPointId = '0';
// 			const openAccessPoint = {
// 				sourceId: sourceId,
// 				accessPointId: accessPointId
// 			};
// 			getOpenAccessPoint.returns(openAccessPoint);
//
// 			worker.findSource();
//
// 			expect(MemoryManager.getOpenAccessPoint).to.have.been.calledWith('roomName0', 'creepId0');
// 			expect(creep.memory.actionInfo).to.eql(new HarvestActionInfo(sourceId, accessPointId));
// 		});
//
// 		it('should move to spawn', () => {
// 			const spawn = {
// 				foo: 'bar'
// 			};
//
// 			creep.room.find = sandbox.stub().returns([spawn]);
//
// 			sandbox.stub(console, 'log');
//
// 			getOpenAccessPoint.returns(undefined);
//
// 			worker.findSource();
//
// 			expect(MemoryManager.getOpenAccessPoint).to.have.been.called;
// 			expect(creep.moveTo).to.have.been.calledWith(spawn, Worker.visualize);
// 			/*eslint-disable no-console */
// 			expect(console.log).to.have.been.calledWith(creep.name + ' has nowhere to go');
// 		});
// 	});
// });
