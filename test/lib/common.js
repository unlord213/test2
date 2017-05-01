"use strict";

global.expect = require("chai").expect;
global.chai = require("chai");
global.sinon = require("sinon");
// global.sinonChai = require("sinon-chai");
chai.use(require("sinon-chai"));

global._ = require('./lib/lodash.js');

require('./screepsAutocomplete.js');
