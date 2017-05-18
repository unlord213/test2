'use strict';

require('./lib/common.js');

const UpgradeControllerActionInfo = require('../src/UpgradeControllerActionInfo');
const Actions = require('../src/Actions');

desc('UpgradeControllerActionInfo', () => {
	it('should set properties', () => {
		const controllerId = 'controllerId0';
		const actionInfo = new UpgradeControllerActionInfo(controllerId);

		expect(actionInfo).to.eql({
			id: Actions.UPGRADE_CONTROLLER,
			upgrading: false,
			controllerId: controllerId
		});
	});
});
