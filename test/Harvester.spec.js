require('./lib/common.js');

const IdleActionInfo = require('../src/IdleActionInfo');
const Harvester = require("../src/Harvester");
let creep;
let harvester;
let getObjectById;

// describe("Harvester", function() {
describe("harvest", function() {
  beforeEach(function() {
    sinon.sandbox.create();
  });

  afterEach(function() {
    // creep.harvest.restore();
    // creep.moveTo.restore();
    getObjectById.restore();

    sinon.sandbox.restore();
  });

  beforeEach(function() {
    getObjectById = sinon.stub(Game, "getObjectById");

    creep = {
      memory: {
        action: {}
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
    // expect(creep.harvest).to.not.have.beenCalled();
  });

  it("should harvest if at source", function() {
    const pos = {
      foo: 'bar'
    };
    const sourceId = 'foobar';
    const source = {
      bar: 'foo'
    };
    // const stub = sinon.stub(Game, "getObjectById");
    stub.returns(source);

    creep.carry = [0];
    creep.carryCapacity = 1;
    creep.pos = pos;
    creep.memory.action.sourceId = sourceId;
    creep.memory.action.position = pos;

    harvester.harvest();
    expect(Game.getObjectById).to.have.been.calledWith(sourceId);
    expect(creep.harvest).to.have.been.calledWith(source);
  });

  it("should move if not at source", function() {
    const pos = {
      foo: 'bar'
    };
    const pos2 = {
      foo: 'bar2'
    };
    const sourceId = 'foobar';
    const source = {
      bar: 'foo'
    };
    // const stub = sinon.stub(Game, "getObjectById");
    stub.returns(source);

    creep.carry = [0];
    creep.carryCapacity = 1;
    creep.pos = pos;
    creep.memory.action.sourceId = sourceId;
    creep.memory.action.position = pos;
    creep.harvest = sinon.stub();

    harvester.harvest();

    expect(Game.getObjectById).to.have.been.calledWith(sourceId);
    expect(creep.harvest).to.have.been.calledWith(source);
  });
});
// });
