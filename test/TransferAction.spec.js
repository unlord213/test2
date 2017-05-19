'use strict';

require('./lib/common.js');

const TransferAction = require('../src/TransferAction');
const IdleActionInfo = require('../src/IdleActionInfo');
const MemoryManager = require('../src/MemoryManager');
// const Worker = require('../src/Worker');

desc('TransferAction', () => {
	let creepName;
	let creep;
	let target;
	let roomInfo;
	let structureId;
	let roomName;

	beforeEach(() => {
		creepName = 'creepName0';
		structureId = 'structureId0';
		roomName = 'roomName0';

		creep = {
			name: creepName,
			carryCapacity: 10,
			carry: {
				energy: 5
			},
			room: {
				name: roomName
			},
			memory: {
				actionInfo: {
					structureId: structureId
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

		roomInfo = {
			energyStructureInfos: {
				spawns: {}
			}
		};
		sandbox.stub(MemoryManager, 'getRoomInfo').returns(roomInfo);
	});

	describe('run', () => {
		it('should stop', () => {
			creep.carry.energy = 0;

			TransferAction.run(creep);

			expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(false));
			expect(Game.getObjectById).to.not.have.been.called;
			expect(creep.transfer).to.not.have.been.called;
			expect(MemoryManager.getRoomInfo).to.have.been.calledWith(roomName);
		});

		it('should delete transfer on stop', () => {
			roomInfo.energyStructureInfos.spawns[structureId] = {
				transfers: {
					creepName0: {},
					creepName1: {
						foo: 'bar'
					}
				}
			};
			creep.carry.energy = 0;

			TransferAction.run(creep);

			expect(roomInfo.energyStructureInfos.spawns[structureId]).to.eql({
				transfers: {
					creepName1: {
						foo: 'bar'
					}
				}
			});
		});

		it('should keep transferring', () => {
			creep.memory.actionInfo.transferring = true;

			TransferAction.run(creep);
			expect(creep.transfer).to.have.been.calledWith(target, RESOURCE_ENERGY);
			expect(creep.moveTo).to.not.have.been.called;
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should start transferring', () => {
			creep.memory.actionInfo.transferring = false;

			creep.transfer.returns(OK);

			TransferAction.run(creep);

			expect(creep.transfer).to.have.been.calledWith(target, RESOURCE_ENERGY);
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
			expect(creep.moveTo).to.have.been.calledWith(target, {
				visualizePathStyle: {
					stroke: '#ffffff'
				}
			});
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should go to full idle if target full', () => {
			creep.transfer.returns(ERR_FULL);
			TransferAction.run(creep);
			expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(false));
		});

		it('should go to not full idle if target full', () => {
			creep.carry = [10];
			creep.transfer.returns(ERR_FULL);
			TransferAction.run(creep);
			expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(true));
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
