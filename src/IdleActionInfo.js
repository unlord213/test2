"use strict";

const ActionInfo = require('./ActionInfo');
const Actions = require('./Actions');

class IdleActionInfo extends ActionInfo {
  constructor(full) {
    super(Actions.IDLE);
    this.full = full;
  }
}

module.exports = IdleActionInfo;
