var expect = require("chai").expect;
// var Test2 = require("../app/Test2");
var TestClass = require("../src/TestClass");

describe("Test", function() {
  it("should set id", function() {
    const foo = new TestClass('foo');
    expect(foo.id).to.equal('foo');
  });
});
