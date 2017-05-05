'use strict';

require('./lib/common.js');

const HarvestActionInfo = require('../src/HarvestActionInfo');

desc('HarvestActionInfo', () => {
	it('should set properties', () => {
		const sourceId = 'foo';
		const accessPointId = 'bar';

		const actionInfo = new HarvestActionInfo(sourceId, accessPointId);

		expect(actionInfo).to.eql({
			id: HarvestActionInfo.id,
			sourceId: sourceId,
			accessPointId: accessPointId,
			harvesting: false
		});
	});
});
