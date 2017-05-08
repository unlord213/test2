'use strict';

require('./lib/common.js');

const TransferActionInfo = require('../src/TransferActionInfo');
const Actions = require('../src/Actions');

desc('TransferActionInfo', () => {
	it('should set properties', () => {
		const actionInfo = new TransferActionInfo();

		expect(actionInfo).to.eql({
			id: Actions.TRANSFER,
			transfering: false
		});
	});
});
