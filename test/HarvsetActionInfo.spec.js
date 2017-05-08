'use strict';

require('./lib/common.js');

const HarvestActionInfo = require('../src/HarvestActionInfo');
const Actions = require('../src/Actions');

desc('HarvestActionInfo', () => {
	it('should set properties', () => {
		const sourceId = 'sourceId0';
		const accessPointId = '0';

		const actionInfo = new HarvestActionInfo(sourceId, accessPointId);

		expect(actionInfo).to.eql({
			id: Actions.HARVESTING,
			sourceId: sourceId,
			accessPointId: accessPointId,
			harvesting: false
		});
	});
});
