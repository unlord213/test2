'use strict';

require('./lib/common.js');

const IdleActionInfo = require('../src/IdleActionInfo');
const Actions = require('../src/Actions');

desc('IdleActionInfo', () => {
	it('should set properties', () => {
		const full = true;

		const actionInfo = new IdleActionInfo(full);

		expect(actionInfo).to.eql({
			id: Actions.IDLE,
			full: full
		});
	});
});
