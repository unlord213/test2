'use strict';

const main = require('../src/main');
const Reporter = require('../src/Reporter');
const MemoryManager = require('../src/MemoryManager');
const CreepManager = require('../src/CreepManager');
const StructureManager = require('../src/StructureManager');

desc('main', () => {
	beforeEach(() => {
		sandbox.stub(MemoryManager, 'initRoomInfos');
		sandbox.stub(MemoryManager, 'updateSpawns');
		sandbox.stub(StructureManager, 'run');
		sandbox.stub(CreepManager, 'run');
		sandbox.stub(Reporter, 'report');
	});

	it('should update memory', () => {
		main.loop();

		expect(MemoryManager.initRoomInfos).to.have.been.called;
		expect(MemoryManager.updateSpawns).to.have.been.called;
	});

	it('should run managers', () => {
		main.loop();

		expect(StructureManager.run).to.have.been.called;
		expect(CreepManager.run).to.have.been.called;
	});

	it('should not report', () => {
		Game.time = 19;
		main.loop();
		expect(Reporter.report).to.not.have.been.called;
	});

	it('should not report', () => {
		Game.time = 20;
		main.loop();
		expect(Reporter.report).to.have.been.called;
	});
});
