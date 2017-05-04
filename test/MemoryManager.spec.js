'use strict';

require('./lib/common.js');

const MemoryManager = require('../src/MemoryManager');
const SourceInfo = require('../src/SourceInfo');

desc('MemoryManager', () => {
  let find;

  beforeEach(() => {
    Memory = {};

    find = sandbox.stub();
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
  });

  it('should init room infos', () => {

  });
  // it('should init sources with my', () => {
  //   Memory.my = {};
  //   MemoryManager.initSources();
  //
  //   expect(Game.spawns['Spawn1'].room.find).to.have.been.calledWith(FIND_SOURCES);
  //   expect(Memory).to.eql({
  //     my: {
  //       sourceInfos: {
  //         '1': new SourceInfo(),
  //         '2': new SourceInfo()
  //       }
  //     }
  //   });
  // })
  //
  // it('should init sources', () => {
  //   MemoryManager.initSources();
  //
  //   expect(Game.spawns['Spawn1'].room.find).to.have.been.calledWith(FIND_SOURCES);
  //   expect(Memory).to.eql({
  //     my: {
  //       sourceInfos: {
  //         '1': new SourceInfo(),
  //         '2': new SourceInfo()
  //       }
  //     }
  //   });
  // })
  //
  // it('should not init if source infos present', () => {
  //   const sourceInfos = ['1', '2'];
  //   Memory.my = {
  //     sourceInfos:sourceInfos
  //   }
  //
  //   MemoryManager.initSources();
  //
  //   expect(Memory.my.sourceInfos).to.eql(sourceInfos);
  //   expect(Game.spawns['Spawn1'].room.find).to.not.have.been.called
  // })
});
