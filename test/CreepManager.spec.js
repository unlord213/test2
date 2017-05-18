'use strict';

require('./lib/common.js');

const IdleActionInfo = require('../src/IdleActionInfo');
const MemoryManager = require('../src/MemoryManager');
const EnergyManager = require('../src/EnergyManager');
const CreepManager = require('../src/CreepManager');
const Roles = require('../src/Roles');
const Worker = require('../src/Worker');
const HarvestActionInfo = require('../src/HarvestActionInfo');
const UpgradeControllerActionInfo = require('../src/UpgradeControllerActionInfo');
const TransferActionInfo = require('../src/TransferActionInfo');

desc('CreepManager', () => {
	describe('run', () => {
		let creep;
		let actionId;
		let roomName;
		let roomInfo;
		let worker;
		let actionInfo;
		let energyManager;
		let accessPoint;

		beforeEach(() => {
			sandbox.stub(console, 'log');

			actionId = 'actionId0';
			actionInfo = {
				id: actionId
			};
			roomName = 'roomName0';

			creep = {
				spawning: false,
				room: {
					name: roomName
				},
				memory: {
					role: Roles.WORKER,
					actionInfo: actionInfo
				}
			};

			Game.creeps = {
				creepId0: creep
			};

			worker = {
				foo: 'bar',
				run: sandbox.stub()
			};
			sandbox.stub(Worker, 'create').returns(worker);

			sandbox.stub(CreepManager, 'findJob');

			roomInfo = {
				bar: 'foo'
			};
			sandbox.stub(MemoryManager, 'getRoomInfo').returns(roomInfo);

			energyManager = {
				getAccessPoint: sandbox.stub()
			};

			accessPoint = {
				pos: {}
			};
			energyManager.getAccessPoint.returns(accessPoint);
			sandbox.stub(EnergyManager, 'create').returns(energyManager);
		});

		it('should find job for idle worker', () => {
			CreepManager.findJob.returns(undefined);
			creep.memory.actionInfo.id = IdleActionInfo.id;

			CreepManager.run();

			expect(MemoryManager.getRoomInfo).to.have.been.calledWith(roomName);
			expect(EnergyManager.create).to.have.been.calledWith(roomInfo);
			expect(CreepManager.findJob).to.have.been.calledWith(creep);
			expect(creep.memory.actionInfo).to.eql(actionInfo);
		});

		it('should set new action info for idle worker', () => {
			const newActionInfo = {
				bar: 'foo'
			};
			CreepManager.findJob.returns(newActionInfo);
			creep.memory.actionInfo.id = IdleActionInfo.id;

			CreepManager.run();

			expect(creep.memory.actionInfo).to.eql(newActionInfo);
		});

		it('should not run spawning creep', () => {
			creep.spawning = true;
			CreepManager.run();

			expect(Worker.create).to.not.have.been.called;
		});

		it('should run worker', () => {
			CreepManager.run();

			expect(Worker.create).to.have.been.calledWith(creep);
			expect(worker.run).to.have.been.called;

			expect(CreepManager.findJob).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should log with unknown role', () => {
			creep.memory.role = 'foo';
			CreepManager.run();

			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith('Unknown creep role: foo');
			expect(worker.run).to.not.have.been.called;
		});
	});

	describe('findJob', () => {
		let creep;
		let energyManager;

		beforeEach(() => {
			creep = {
				memory: {
					actionInfo: {}
				}
			};
			energyManager = {
				foobar: 'barfoo'
			};

			sandbox.stub(CreepManager, '_findEnergyTarget');
			sandbox.stub(CreepManager, '_findSource');
		});

		it('should find energy target', () => {
			creep.memory.actionInfo.full = true;

			const energyTarget = {
				foo: 'bar'
			};
			CreepManager._findEnergyTarget.returns(energyTarget);

			const actual = CreepManager.findJob(creep, energyManager);
			expect(actual).to.eql(energyTarget);

			expect(CreepManager._findEnergyTarget).to.have.been.calledWith(creep, energyManager);
			expect(CreepManager._findSource).to.not.have.been.called;
		});

		it('should find source', () => {
			creep.memory.actionInfo.full = false;

			const source = {
				foo: 'bar'
			};
			CreepManager._findSource.returns(source);

			const actual = CreepManager.findJob(creep, energyManager);
			expect(actual).to.eql(source);

			expect(CreepManager._findSource).to.have.been.calledWith(creep, energyManager);
			expect(CreepManager._findEnergyTarget).to.not.have.been.called;
		});
	});

	describe('_findSource', () => {
		let creep;
		let energyManager;

		beforeEach(() => {
			creep = {
				memory: {
					actionInfo: {}
				}
			};
			energyManager = {
				foobar: 'barfoo',
				getOpenAccessPoint: sandbox.stub()
			};
		});

		it('should return harvest action', () => {
			const accessPoint = {
				sourceId: 'sourceId0',
				accessPointId: 'accessPointId0',
			};
			energyManager.getOpenAccessPoint.returns(accessPoint);

			const actionInfo = CreepManager._findSource(creep, energyManager);
			expect(actionInfo).to.eql(new HarvestActionInfo('sourceId0', accessPoint.accessPointId));
		});

		it('should return undefined', () => {
			energyManager.getOpenAccessPoint.returns(undefined);

			const actionInfo = CreepManager._findSource(creep, energyManager);
			expect(actionInfo).to.eql(undefined);
		});
	});

	describe('_findEnergyTarget', () => {
		let creep;
		let energyManager;
		let creepId;
		let energy;
		let controllerId;
		let roomInfo;
		let roomName;

		beforeEach(() => {
			creepId = 'creepId0';
			energy = 42;
			controllerId = 'controllerId0';
			roomName = 'roomName0';

			creep = {
				id: creepId,
				energy: energy,
				room: {
					name: roomName,
					controller: {
						id: controllerId
					}
				}
			};
			energyManager = {
				foobar: 'barfoo',
				findStructureNeedingEnergy: sandbox.stub()
			};

			roomInfo = {
				upgradeCreepId: creepId
			};
			sandbox.stub(MemoryManager, 'getRoomInfo').returns(roomInfo);
		});

		it('should return upgrade controller action when no creep is upgrading controller', () => {
			roomInfo.upgradeCreepId = null;

			const actionInfo = CreepManager._findEnergyTarget(creep, energyManager);
			expect(actionInfo).to.eql(new UpgradeControllerActionInfo());
			expect(MemoryManager.getRoomInfo).to.have.been.calledWith(roomName);
		});

		it('should return transfer action', () => {
			roomInfo.upgradeCreepId = creepId;

			const structureId = 'structureId0';
			energyManager.findStructureNeedingEnergy.returns(structureId);

			const actionInfo = CreepManager._findEnergyTarget(creep, energyManager);
			expect(actionInfo).to.eql(new TransferActionInfo());
			expect(energyManager.findStructureNeedingEnergy).to.have.been.calledWith(energy, creepId);
		});

		it('should return upgrade controller action when no structures need energy', () => {
			roomInfo.upgradeCreepId = creepId;
			energyManager.findStructureNeedingEnergy.returns(undefined);

			const actionInfo = CreepManager._findEnergyTarget(creep, energyManager);
			expect(actionInfo).to.eql(new UpgradeControllerActionInfo());
		});
	});
});
