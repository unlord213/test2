'use strict';

require('./lib/common.js');

const ActionInfo = require('../src/ActionInfo');

desc('ActionInfo', () => {
	it('should set id', () => {
		const id = 'foo';
		const actionInfo = new ActionInfo(id);
		expect(actionInfo.id).to.eql(id);
	});
});
