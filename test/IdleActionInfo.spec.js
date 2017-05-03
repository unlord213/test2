"use strict";

require('./lib/common.js');

const IdleActionInfo = require('../src/IdleActionInfo');

desc('IdleActionInfo', () => {
  it('should set properties', () => {
    const full = true;

    const actionInfo = new IdleActionInfo(full);

    expect(actionInfo).to.eql({
      id: IdleActionInfo.id,
      full: full
    });
  })
})
