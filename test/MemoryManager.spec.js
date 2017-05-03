'use strict';

require('./lib/common.js');

const MemoryManager = require('../src/MemoryManager');
const SourceInfo = require('../src/SourceInfo');

desc('MemoryManager', () => {
  it('should init sources', () => {
    Memory = {};
    const find = sandbox.stub();
    find.returns([{
      id: '1'
    }, {
      id: '2'
    }]);

    Game.spawns['Spawn1'] = {
      room: {
        find: find
      }
    }

    MemoryManager.initSources();
    expect(Memory).to.eql({
      my: {
        sourceInfos: {
          '1': new SourceInfo(),
          '2': new SourceInfo()
        }
      }
    });
  })
})
