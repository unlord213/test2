const TestClass = require('./TestClass');

class TestClass2 extends TestClass {
  constructor(id) {
    super(id);
  }

  getObject() {
    return Game.getObjectById(this.id);
  }
}

module.exports = TestClass2;
