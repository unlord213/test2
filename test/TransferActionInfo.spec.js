'use strict';

require('./lib/common.js');

const TransferActionInfo = require('../src/TransferActionInfo');
const Actions = require('../src/Actions');

desc('TransferActionInfo', () => {
	it('should set properties', () => {
		const structureId = 'spawnId0';
		const actionInfo = new TransferActionInfo(structureId);

		expect(actionInfo).to.eql({
			id: Actions.TRANSFER,
			transferring: false,
			structureId: structureId
		});
	});
});
