"use strict";

const ActionInfo = require('./ActionInfo');
const Actions = require('./Actions');

class IdleActionInfo extends ActionInfo {
  constructor(full) {
    super(IdleActionInfo.id);
    this.full = full;
  }
}
IdleActionInfo.id = Actions.IDLE

module.exports = IdleActionInfo;
