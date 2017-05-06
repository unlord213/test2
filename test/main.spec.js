'use strict';

require('./lib/common.js');
// const rewire = require('rewire');
// const proxyquire = require('proxyquire').noCallThru();

const main = require('../src/main');
const Reporter = require('../src/Reporter');
const Harvester = require('../src/Harvester');
// let HarvesterMock = {
// 	run: sandbox.spy()
// }
// proxyquire('../src/Harvester', {'./Harvester': HarvesterMock});

desc('main', () => {

	beforeEach(() => {
		// const HarvesterStub = rewire('../src/Harvester');
		// const HarvesterMock =
		// main.__set__('Harvester', sinon.spy());
		// var HarvesterStub = sinon.spy(global, 'Harvester');
		// const HarvesterStub = sandbox.spy(() => sinon.createStubInstance(Harvester));

		// sh.getStubConstructor(Harvester);

		sandbox.stub(Harvester.prototype, 'run');
		sandbox.spy(Harvester);
		// var MockExample = sinon.stub();
		// MockExample.prototype.run = sinon.stub().returns('42');
		// var example = new MockExample();
		// console.log("example: " + example.run()); // outputs 42

		sandbox.stub(Reporter, 'report');

		Game.structures = {};
		// Game.structures.returns({});

		Game.creeps = {
			creepId0: {

			}
		};

		// Game.creeps.returns({});
	});

	it('should not report', () => {
		Game.time = 19;
		main.loop();
		expect(Reporter.report).to.not.have.been.called;
		expect(Harvester.prototype.run).to.have.been.called;
	});

	it('should not report', () => {
		Game.time = 20;
		main.loop();
		expect(Reporter.report).to.have.been.called;
	});
});
