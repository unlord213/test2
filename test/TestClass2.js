var expect = require("chai").expect;
// var Test2 = require("../app/Test2");
var TestClass2 = require("../src/TestClass2");
// require("../ScreepsAutocomplete/Global/constants.js");
// require('../requirejs.config.js');
// require('./screepsAutocomplete');
//
// require.config({
//   'screeps': {
//     deps: ['../ScreepsAutocomplete/**/*.js'],
//     exports: 'screeps'
//   }
// });
require('./screepsAutocomplete.js');

var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe("TestClass2", function() {
  it("should set id", function() {
    const foo = new TestClass2('foo');
    expect(foo.id).to.equal('foo');
    expect(ERR_NOT_OWNER).to.equal(-1);
  });

  it("should get object", function() {
    const object = {foo: 'bar'};
    var spy = sinon.stub(Game, 'getObjectById');
    spy.returns(object);

    const foo = new TestClass2('foo');
    const obj = foo.getObject();

    expect(Game.getObjectById).to.have.been.calledWith("foo");
    expect(obj).to.eql({foo: 'bar'});
  });
});
