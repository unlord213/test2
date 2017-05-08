'use strict';

require('./lib/common.js');

const Position = require('../src/Position');

desc('Position', () => {
	it('should set properties', () => {
		const x = 42;
		const y = 43;

		const position = new Position(x, y);

		expect(position).to.eql({
			x: x,
			y: y
		});
	});
});
