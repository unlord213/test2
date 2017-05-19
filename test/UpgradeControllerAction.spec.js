'use strict';

require('./lib/common.js');

const UpgradeControllerAction = require('../src/UpgradeControllerAction');
const IdleActionInfo = require('../src/IdleActionInfo');
const MemoryManager = require('../src/MemoryManager');
// const Worker = require('../src/Worker');

desc('UpgradeControllerAction', () => {
	let creepName;
	let creep;
	let target;
	let roomInfo;
	let roomName;

	beforeEach(() => {
		creepName = 'creepName0';
		roomName = 'roomName0';

		creep = {
			name: creepName,
			carry: {
				energy: 5
			},
			room: {
				name: roomName
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

		roomInfo = {};
		sandbox.stub(MemoryManager, 'getRoomInfo').returns(roomInfo);
	});

	describe('run', () => {
		it('should stop', () => {
			creep.carry.energy = 0;

			UpgradeControllerAction.run(creep);

			expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(false));
			expect(Game.getObjectById).to.not.have.been.called;
			expect(creep.upgradeController).to.not.have.been.called;
			expect(MemoryManager.getRoomInfo).to.have.been.calledWith(roomName);
		});

		it('should remove upgrade creep name on stop', () => {
			roomInfo.upgradeCreepName = creepName;
			creep.carry.energy = 0;

			UpgradeControllerAction.run(creep);

			expect(roomInfo.upgradeCreepName).to.eql(null);
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
