'use strict';

require('./lib/common.js');

const AccessPoint = require('../src/AccessPoint');

desc('AccessPoint', () => {
	it('should set properties', () => {
		const pos = {
			foo: 'bar'
		};
		const creepId = 'creepId0';
		const accessPoint = new AccessPoint(pos, creepId);
		expect(accessPoint).to.eql({
			creepId: creepId,
			pos: pos
		});
	});
});
