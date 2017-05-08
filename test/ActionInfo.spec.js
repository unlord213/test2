'use strict';

require('./lib/common.js');

const ActionInfo = require('../src/ActionInfo');

desc('ActionInfo', () => {
	it('should set properties', () => {
		const id = 'foo';
		const actionInfo = new ActionInfo(id);
		expect(actionInfo).to.eql({
			id: id
		});
	});
});
