'use strict';

require('./lib/common.js');

const SourceInfo = require('../src/SourceInfo');

desc('SourceInfo', () => {
	it('should set properties', () => {
		const sourceInfo = new SourceInfo();
		expect(sourceInfo).to.eql({
			accessPoints: {}
		});
	});
});
