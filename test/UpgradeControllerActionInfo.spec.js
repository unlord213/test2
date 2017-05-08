'use strict';

require('./lib/common.js');

const UpgradeControllerActionInfo = require('../src/UpgradeControllerActionInfo');
const Actions = require('../src/Actions');

desc('UpgradeControllerActionInfo', () => {
	it('should set properties', () => {
		const actionInfo = new UpgradeControllerActionInfo();

		expect(actionInfo).to.eql({
			id: Actions.UPGRADE_CONTROLLER,
			upgrading: false
		});
	});
});
