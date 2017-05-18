'use strict';

require('./lib/common.js');

const UpgradeControllerAction = require('../src/UpgradeControllerAction');
const IdleActionInfo = require('../src/IdleActionInfo');
// const Worker = require('../src/Worker');

desc('UpgradeControllerAction', () => {
	let creepId;
	let creep;
	let target;

	beforeEach(() => {
		creepId = 'creepId0';

		creep = {
			id: creepId,
			carry: {
				energy: 5
			},
			memory: {
				actionInfo: {
					sourceId: 'sourceId0'
				}
			},
			upgradeController: sandbox.stub(),
			moveTo: sandbox.stub()
		};

		target = {
			foo: 'bar'
		};
		sandbox.stub(Game, 'getObjectById').returns(target);

		sandbox.stub(console, 'log');
	});

	describe('run', () => {
		it('should stop', () => {
			creep.carry.energy = 0;

			UpgradeControllerAction.run(creep);

			expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(false));
			expect(Game.getObjectById).to.not.have.been.called;
			expect(creep.upgradeController).to.not.have.been.called;
		});

		it('should keep upgrading', () => {
			creep.memory.actionInfo.upgrading = true;

			UpgradeControllerAction.run(creep);
			expect(creep.upgradeController).to.have.been.calledWith(target);
			expect(creep.moveTo).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should start upgrading', () => {
			creep.memory.actionInfo.upgrading = false;

			creep.upgradeController.returns(OK);

			UpgradeControllerAction.run(creep);

			expect(creep.upgradeController).to.have.been.calledWith(target);
			expect(creep.memory.actionInfo.upgrading).to.eql(true);
			expect(creep.moveTo).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should move to target', () => {
			creep.memory.actionInfo.upgrading = undefined;

			creep.upgradeController.returns(ERR_NOT_IN_RANGE);

			UpgradeControllerAction.run(creep);

			expect(creep.upgradeController).to.have.been.calledWith(target);
			expect(creep.memory.actionInfo.upgrading).to.eql(undefined);
			// TODO: figure out why Worker.visualize isnt coming in
			expect(creep.moveTo).to.have.been.calledWith(target, {
				visualizePathStyle: {
					stroke: '#ffffff'
				}
			});
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should log upgrade error', () => {
			creep.memory.actionInfo.upgrading = undefined;

			creep.upgradeController.returns('foo');

			UpgradeControllerAction.run(creep);

			expect(creep.upgradeController).to.have.been.calledWith(target);
			expect(creep.memory.actionInfo.upgrading).to.eql(undefined);
			expect(creep.moveTo).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith('Error upgrading controller: foo');
		});
	});
});
