'use strict';

require('./lib/common.js');

const TransferAction = require('../src/TransferAction');
const IdleActionInfo = require('../src/IdleActionInfo');
// const Worker = require('../src/Worker');

desc('TransferAction', () => {
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
			transfer: sandbox.stub(),
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

			TransferAction.run(creep);

			expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(false));
			expect(Game.getObjectById).to.not.have.been.called;
			expect(creep.transfer).to.not.have.been.called;
		});

		it('should keep transferring', () => {
			creep.memory.actionInfo.transferring = true;

			TransferAction.run(creep);
			expect(creep.transfer).to.have.been.calledWith(target);
			expect(creep.moveTo).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should start transferring', () => {
			creep.memory.actionInfo.transferring = false;

			creep.transfer.returns(OK);

			TransferAction.run(creep);

			expect(creep.transfer).to.have.been.calledWith(target);
			expect(creep.memory.actionInfo.transferring).to.eql(true);
			expect(creep.moveTo).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should move to target', () => {
			creep.memory.actionInfo.transferring = undefined;

			creep.transfer.returns(ERR_NOT_IN_RANGE);

			TransferAction.run(creep);

			expect(creep.transfer).to.have.been.calledWith(target);
			expect(creep.memory.actionInfo.transferring).to.eql(undefined);
			// TODO: figure out why Worker.visualize isnt coming in
			expect(creep.moveTo).to.have.been.calledWith(target, undefined);
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should log transfer error', () => {
			creep.memory.actionInfo.transferring = undefined;

			creep.transfer.returns('foo');

			TransferAction.run(creep);

			expect(creep.transfer).to.have.been.calledWith(target);
			expect(creep.memory.actionInfo.transferring).to.eql(undefined);
			expect(creep.moveTo).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith('Error transferring: foo');
		});
	});
});
