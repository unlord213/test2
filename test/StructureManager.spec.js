'use strict';

require('./lib/common.js');

const StructureManager = require('../src/StructureManager');
const IdleActionInfo = require('../src/IdleActionInfo');
const Roles = require('../src/Roles');

desc('StructureManager', () => {
	describe('run', () => {
		let structure;
		beforeEach(() => {
			structure = {
				structureType: undefined,
				createCreep: sandbox.stub()
			};

			Game.structures = {
				structureId0: structure
			};

			sandbox.stub(console, 'log');

		});

		it('should create creep', () => {
			Game.structures.structureId0.structureType = STRUCTURE_SPAWN;
			StructureManager.run();

			expect(Game.structures.structureId0.createCreep).to.have.been.calledWith(
				[WORK, CARRY, MOVE], undefined, {
					role: Roles.WORKER,
					actionInfo: new IdleActionInfo(false)
				}
			);
			/*eslint-disable no-console */
			expect(console.log).to.not.have.been.called;
		});

		it('should log unknown structure type', () => {
			Game.structures.structureId0.structureType = 'foo';
			StructureManager.run();

			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith('Unknown structure type: foo');
			expect(Game.structures.structureId0.createCreep).to.not.have.been.called;
		});
	});
});
