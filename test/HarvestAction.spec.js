'use strict';

require('./lib/common.js');

// const Worker = require('../src/Worker');
const IdleActionInfo = require('../src/IdleActionInfo');
const HarvestAction = require('../src/HarvestAction');

desc('HarvestAction', () => {
	describe('run', () => {
		let energyManager;
		let creepId;
		let creep;
		let accessPoint;
		let source;
		let roomName;

		beforeEach(() => {
			creepId = 'creepId0';
			roomName = 'roomName0';

			creep = {
				id: creepId,
				carryCapacity: 15,
				carry: [],
				room: {
					name: roomName
				},
				memory: {
					actionInfo: {
						sourceId: 'sourceId0'
					}
				},
				pos: {},
				harvest: sandbox.stub(),
				moveTo: sandbox.stub()
			};

			energyManager = {
				getAccessPoint: sandbox.stub()
			};

			accessPoint = {
				pos: {}
			};
			energyManager.getAccessPoint.returns(accessPoint);

			source = {
				foo: 'bar'
			};
			sandbox.stub(Game, 'getObjectById').returns(source);
		});

		it('should stop harvesting', () => {
			creep.carry = [5, 10];

			HarvestAction.run(creep, energyManager);

			expect(accessPoint.creepId).to.eql(null);
			expect(creep.memory.actionInfo).to.eql(new IdleActionInfo(true));
			expect(Game.getObjectById).to.not.have.been.called;
			expect(creep.harvest).to.not.have.been.called;
		});

		it('should keep harvesting', () => {
			creep.memory.actionInfo.harvesting = true;
			HarvestAction.run(creep, energyManager);

			expect(creep.harvest).to.have.been.calledWith(source);
			expect(accessPoint.creepId).to.eql(undefined);
		});

		it('should start harvesting', () => {
			creep.memory.actionInfo.harvesting = false;
			creep.pos.x = 1;
			creep.pos.y = 2;
			accessPoint.pos.x = 1;
			accessPoint.pos.y = 2;

			HarvestAction.run(creep, energyManager);

			expect(creep.harvest).to.have.been.calledWith(source);
			expect(accessPoint.creepId).to.eql(creepId);
			expect(creep.moveTo).to.not.have.been.called;
		});

		it('should move to access point', () => {
			creep.memory.actionInfo.harvesting = false;
			creep.pos.x = 1;
			creep.pos.y = 2;
			accessPoint.pos.x = 1;
			accessPoint.pos.y = 3;

			HarvestAction.run(creep, energyManager);

			// TODO: figure out how to mock roomPosition
			// TODO: figure out why Worker.visualize isnt coming in
			// expect(creep.moveTo).to.have.been.calledWith({}, Worker.visualize);
			expect(creep.harvest).to.not.have.been.called;
		});
	});
});
