"use strict";

require('./lib/common.js');

const IdleActionInfo = require('../src/IdleActionInfo');
const Harvester = require("../src/Harvester");

describe("Harvester", function() {
  desc("harvest", function() {
    let creep;
    let harvester;

    const sourceId = 'foobar';
    const pos = {
      foo: 'bar'
    };

    beforeEach(function() {
      creep = {
        carry: [0],
        carryCapacity: 1,
        memory: {
          action: {
            sourceId: sourceId
          }
        },
        harvest: sinon.stub(),
        moveTo: sinon.stub()
      };

      harvester = new Harvester(creep);
    });

    it("creep should stop harvesting then carry is full", function() {
      creep.carry = [1];
      creep.carryCapacity = 1;

      harvester.harvest();

      expect(creep.memory.action).to.eql(new IdleActionInfo(true));
      expect(creep.harvest).to.not.have.been.called;
      expect(creep.moveTo).to.not.have.been.called;
    });

    it("should harvest if at source", function() {
      const source = {
        bar: 'foo'
      };

      const getObjectById = sandbox.stub(Game, "getObjectById");
      getObjectById.returns(source);

      creep.pos = pos;
      creep.memory.action.position = pos;

      harvester.harvest();

      expect(Game.getObjectById).to.have.been.calledWith(sourceId);
      expect(creep.harvest).to.have.been.calledWith(source);
      expect(creep.moveTo).to.not.have.been.called;
    });

    it("should move if not at source", function() {
      const pos2 = {
        bar: 'foo'
      };

      creep.pos = pos;
      creep.memory.action.position = pos2;

      harvester.harvest();

      expect(creep.harvest).to.not.have.been.called;
      expect(creep.moveTo).to.have.been.calledWith(pos2);
    });
  });
});
