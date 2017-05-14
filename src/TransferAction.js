'use strict';

class TransferAction {}

const IdleActionInfo = require('./IdleActionInfo');
const Worker = require('./Worker');

TransferAction.run = (creep) => {
	const actionInfo = creep.memory.actionInfo;

	if (0 === creep.carry.energy) {
		creep.memory.actionInfo = new IdleActionInfo(false);
		return;
	}

	const target = Game.getObjectById(actionInfo.sourceId);
	if (actionInfo.transferring) {
		creep.transfer(target);
		return;
	}

	const result = creep.transfer(target);
	switch (result) {
		case OK:
			actionInfo.transferring = true;
			break;
		case ERR_NOT_IN_RANGE:
			creep.moveTo(target, Worker.visualize);
			break;
		default:
			/*eslint-disable no-console */
			console.log('Error transferring: ' + result);
	}
};

module.exports = TransferAction;
