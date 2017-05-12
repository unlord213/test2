'use strict';

require('./lib/common.js');

const CreepManager = require('../src/CreepManager');
const Roles = require('../src/Roles');
const Worker = require('../src/Worker');
const IdleActionInfo = require('../src/IdleActionInfo');
const HarvestActionInfo = require('../src/HarvestActionInfo');
const UpgradeControllerActionInfo = require('../src/UpgradeControllerActionInfo');
const TransferActionInfo = require('../src/TransferActionInfo');

desc('CreepManager', () => {
	describe('run', () => {
		let create;
		let creep;
		let actionId;

		beforeEach(() => {
			sandbox.stub(console, 'log');
			sandbox.stub(CreepManager, '_runWorker');
			create = sandbox.stub(Worker, 'create');

			actionId = 'actionId0';
			creep = {
				spawning: false,
				memory: {
					role: Roles.WORKER,
					actionInfo: {
						id: actionId
					}
				}
			};

			Game.creeps = {
				creepId0: creep
			};
		});

		it('should run worker', () => {
			const worker = {
				foo: 'bar'
			};
			create.withArgs(creep).returns(worker);

			CreepManager.run();

			expect(Worker.create).to.have.been.calledWith(creep);
			expect(CreepManager._runWorker).to.have.been.calledWith(actionId, worker);

			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should run worker', () => {
			creep.spawning = true;
			CreepManager.run();

			expect(Worker.create).to.not.have.been.called;
			expect(CreepManager._runWorker).to.not.have.been.called;

			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should log with unknown role', () => {
			creep.memory.role = 'foo';
			CreepManager.run();

			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith('Unknown creep role: foo');
			expect(CreepManager._runWorker).to.not.have.been.called;
		});
	});

	describe('_runWorker', () => {
		beforeEach(() => {
			sandbox.stub(console, 'log');
		});

		it('should have worker find job', () => {
			const actionId = IdleActionInfo.id;
			const worker = {
				findJob: sandbox.stub()
			};

			CreepManager._runWorker(actionId, worker);

			expect(worker.findJob).to.have.been.called;
			expect(console.log).to.not.have.been.called;
		});

		it('should have worker harvest', () => {
			const actionId = HarvestActionInfo.id;
			const worker = {
				harvest: sandbox.stub()
			};

			CreepManager._runWorker(actionId, worker);

			expect(worker.harvest).to.have.been.called;
			expect(console.log).to.not.have.been.called;
		});

		it('should have worker upgrade controller', () => {
			const actionId = UpgradeControllerActionInfo.id;
			const worker = {
				perform: sandbox.stub()
			};

			CreepManager._runWorker(actionId, worker);

			expect(worker.perform).to.have.been.calledWith('upgradeController');
			expect(console.log).to.not.have.been.called;
		});

		it('should have worker transfer', () => {
			const actionId = TransferActionInfo.id;
			const worker = {
				perform: sandbox.stub()
			};

			CreepManager._runWorker(actionId, worker);

			expect(worker.perform).to.have.been.calledWith('transfer');
			expect(console.log).to.not.have.been.called;
		});

		it('should log on unknown action id', () => {
			const actionId = 'foo';
			const worker = {};

			CreepManager._runWorker(actionId, worker);

			expect(console.log).to.have.been.calledWith('Unknown action id: foo');
		});
	});
});
