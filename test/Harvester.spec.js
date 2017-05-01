require('./screepsAutocomplete.js');

const expect = require("chai").expect;
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

global._ = require('./lib/lodash.js')

const IdleActionInfo = require('../src/IdleActionInfo');
const Harvester = require("../src/Harvester");

describe("Harvester", function() {
  describe("harvest", function() {
    it("creep should stop harvesting then carry is full", function() {
      const creep = {
        carry: [1],
        carryCapacity: 1,
        memory: {
          action: {},
        },
        foo: sinon.stub()
      };

      const harvester = new Harvester(creep);
      harvester.harvest();

      expect(creep.memory.action).to.eql(new IdleActionInfo(true));
      expect(creep.foo).to.have.been.calledWith("bar");
    });
  });
});
