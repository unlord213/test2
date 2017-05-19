'use strict';

require('./lib/common.js');

const TransferInfo = require('../src/TransferInfo');

desc('TransferInfo', () => {
	it('should set properties', () => {
		const creepName = 'creepName0';
		const energy = 42;

		const actionInfo = new TransferInfo(creepName, energy);

		expect(actionInfo).to.eql({
			creepName: creepName,
			energy: energy
		});
	});
});
