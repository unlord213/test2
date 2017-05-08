'use strict';

require('./lib/common.js');

const TransferInfo = require('../src/TransferInfo');

desc('TransferInfo', () => {
	it('should set properties', () => {
		const creepId = 'creepId0';
		const energy = 42;

		const actionInfo = new TransferInfo(creepId, energy);

		expect(actionInfo).to.eql({
			creepId: creepId,
			energy: energy
		});
	});
});
