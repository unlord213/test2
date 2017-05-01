"use strict";

global.expect = require("chai").expect;
global.chai = require("chai");
global.sinon = require("sinon");
// global.sinonChai = require("sinon-chai");
global.chai.use(require("sinon-chai"));

global._ = require('./lodash.js');

require('./screepsAutocomplete.js');
