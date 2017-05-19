'use strict';

require('./lib/common.js');

const AccessPoint = require('../src/AccessPoint');

desc('AccessPoint', () => {
	it('should set properties', () => {
		const pos = {
			foo: 'bar'
		};
		const creepName = 'creepName0';
		const accessPoint = new AccessPoint(pos, creepName);
		expect(accessPoint).to.eql({
			creepName: creepName,
			pos: pos
		});
	});
});
