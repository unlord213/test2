'use strict';

const ActionInfo = require('./ActionInfo');
const Actions = require('./Actions');

class TransferActionInfo extends ActionInfo {
	constructor() {
		super(TransferActionInfo.id);
		this.transfering = false;
	}
}
TransferActionInfo.id = Actions.TRANSFER;

module.exports = TransferActionInfo;
