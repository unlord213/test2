'use strict';

require('./lib/common.js');

const Worker = require('../src/Worker');
const IdleActionInfo = require('../src/IdleActionInfo');
const HarvestActionInfo = require('../src/HarvestActionInfo');
const UpgradeControllerActionInfo = require('../src/UpgradeControllerActionInfo');
const TransferActionInfo = require('../src/TransferActionInfo');
const HarvestAction = require('../src/HarvestAction');
const UpgradeControllerAction = require('../src/UpgradeControllerAction');
const TransferAction = require('../src/TransferAction');

desc('Worker', () => {
	describe('constructor', () => {
		it('should set properties', () => {});
	});

	describe('run', () => {
		let creep;
		let worker;

		beforeEach(() => {
			creep = {
				memory: {
					actionInfo: {}
				}
			};

			worker = new Worker(creep);

			sandbox.stub(worker, '_moveToSpawn');
			sandbox.stub(HarvestAction, 'run');
			sandbox.stub(UpgradeControllerAction, 'run');
			sandbox.stub(TransferAction, 'run');
			sandbox.stub(console, 'log');
		});

		it('should move to spawn', () => {
			creep.memory.actionInfo.id = IdleActionInfo.id;

			worker.run();
			expect(worker._moveToSpawn).to.have.been.called;

			expect(HarvestAction.run).to.not.have.been.called;
			expect(UpgradeControllerAction.run).to.not.have.been.called;
			expect(TransferAction.run).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should harvest', () => {
			creep.memory.actionInfo.id = HarvestActionInfo.id;

			worker.run();
			expect(HarvestAction.run).to.have.been.calledWith(creep);

			expect(worker._moveToSpawn).to.not.have.been.called;
			expect(UpgradeControllerAction.run).to.not.have.been.called;
			expect(TransferAction.run).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should upgrade controller', () => {
			creep.memory.actionInfo.id = UpgradeControllerActionInfo.id;

			worker.run();
			expect(UpgradeControllerAction.run).to.have.been.calledWith(creep);

			expect(worker._moveToSpawn).to.not.have.been.called;
			expect(HarvestAction.run).to.not.have.been.called;
			expect(TransferAction.run).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should transfer', () => {
			creep.memory.actionInfo.id = TransferActionInfo.id;

			worker.run();
			expect(TransferAction.run).to.have.been.calledWith(creep);

			expect(worker._moveToSpawn).to.not.have.been.called;
			expect(HarvestAction.run).to.not.have.been.called;
			expect(UpgradeControllerAction.run).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should log unknown action id', () => {
			creep.memory.actionInfo.id = 'foo';

			worker.run();
			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith('Unknown action id: foo');

			expect(worker._moveToSpawn).to.not.have.been.called;
			expect(HarvestAction.run).to.not.have.been.called;
			expect(UpgradeControllerAction.run).to.not.have.been.called;
			expect(TransferAction.run).to.not.have.been.called;
		});
	});

	describe('_moveToSpawn', () => {
		it('should move to spawn', () => {
			const creepName = 'creepName0';
			const creep = {
				name: creepName,
				moveTo: sandbox.stub(),
				room: {
					find: sandbox.stub(),
				}
			};

			const worker = new Worker(creep);

			const spawn = {
				foo: 'bar'
			};

			creep.room.find.returns([spawn]);

			sandbox.stub(console, 'log');

			worker._moveToSpawn();

			expect(creep.moveTo).to.have.been.calledWith(spawn, Worker.visualize);
			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith(creep.name + ' has nowhere to go');
		});
	});

	describe('SpawnFilter', () => {
		it('should filter array', () => {
			const structure0 = {
				structureType: STRUCTURE_SPAWN
			};
			const structure1 = {
				structureType: 'foo'
			};
			const structure2 = {
				structureType: STRUCTURE_SPAWN
			};

			const array = [structure0, structure1, structure2];
			const results = array.filter(Worker.SpawnFilter.filter);

			expect(results).to.eql([structure0, structure2]);
		});
	});

	describe('create', () => {
		it('should create', () => {
			const creep = {
				foo: 'bar'
			};
			const actual = Worker.create(creep);
			expect(actual).to.eql(new Worker(creep));
		});
	});
});
