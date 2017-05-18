'use strict';

const ActionInfo = require('./ActionInfo');
const Actions = require('./Actions');

class TransferActionInfo extends ActionInfo {
	constructor(structureId) {
		super(TransferActionInfo.id);
		this.transferring = false;
		this.structureId = structureId;
	}
}
TransferActionInfo.id = Actions.TRANSFER;

module.exports = TransferActionInfo;
