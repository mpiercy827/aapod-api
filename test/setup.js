'use strict';

const Chai = require('chai');

Chai
.use(require('chai-as-promised'))
.use(require('sinon-chai'));

global.expect = Chai.expect;
