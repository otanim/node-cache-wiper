process.env.NODE_ENV = 'testing';

var sinon = require('sinon');
let logger = require('../');

describe('variations', function () {
  let sandbox;

  beforeEach(function () {
    logger.init();
    // create a sandbox
    sandbox = sinon.sandbox.create();
    sandbox.stub(console, 'log');
  });

  afterEach(function () {
    // restore the environment as it was before
    sandbox.restore();
  });

  it('single: 1 times', function () {
    console.llog('single');

    sinon.assert.calledWithExactly(console.log, 'single');
  });

  it('single: 2 times', function () {
    console.llog('single 1');
    console.llog('single 2');

    sinon.assert.calledWithExactly(console.log, 'single 1');
    sinon.assert.calledWithExactly(console.log, 'single 2');
  });

  it('1st level: 1x', function () {
    console.llog('1st level', 'begin');
    console.llog('1st level', 'end');

    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, '1st level');
  });

  it('1st level > single', function () {
    console.llog('1st level', 'begin');
    console.llog('single');
    console.llog('1st level', 'end');

    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, '    single');
    sinon.assert.calledWithExactly(console.log, '1st level');
  });

  it('1st level > 2nd level', function () {
    console.llog('1st level', 'begin');
    console.llog('2nd level', 'begin');
    console.llog('2nd level', 'end');
    console.llog('1st level', 'end');

    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, '    2nd level');
    sinon.assert.calledWithExactly(console.log, '    2nd level');
    sinon.assert.calledWithExactly(console.log, '1st level');
  });

  it('1st level > 2nd level > 3rd level', function () {
    console.llog('1st level', 'begin');
    console.llog('2nd level', 'begin');
    console.llog('3rd level', 'begin');
    console.llog('3rd level', 'end');
    console.llog('2nd level', 'end');
    console.llog('1st level', 'end');

    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, '    2nd level');
    sinon.assert.calledWithExactly(console.log, '        3rd level');
    sinon.assert.calledWithExactly(console.log, '        3rd level');
    sinon.assert.calledWithExactly(console.log, '    2nd level');
    sinon.assert.calledWithExactly(console.log, '1st level');
  });

  it('single; 1st level', function () {
    console.llog('single');
    console.llog('1st level', 'begin');
    console.llog('1st level', 'end');

    sinon.assert.calledWithExactly(console.log, 'single');
    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, '1st level');
  });

  it('1st level; single', function () {
    console.llog('1st level', 'begin');
    console.llog('1st level', 'end');
    console.llog('single');

    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, 'single');
  });

  it('single; 1st level; single;', function () {
    console.llog('single 1');
    console.llog('1st level', 'begin');
    console.llog('1st level', 'end');
    console.llog('single 2');

    sinon.assert.calledWithExactly(console.log, 'single 1');
    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, 'single 2');
  });

  it('complex', function () {
    console.llog('single 1');
    console.llog('1st level', 'begin');
    console.llog('single 2');
    console.llog('single 3');
    console.llog('2nd level', 'begin');
    console.llog('single 4');
    console.llog('single 5');
    console.llog('single 6');
    console.llog('3rd level', 'begin');
    console.llog('single 7');
    console.llog('single 8');
    console.llog('3rd level', 'end');
    console.llog('single 9');
    console.llog('2nd level', 'end');
    console.llog('single 10');
    console.llog('1st level', 'end');
    console.llog('single 11');
    console.llog('single 12');

    sinon.assert.calledWithExactly(console.log, 'single 1');
    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, '    single 2');
    sinon.assert.calledWithExactly(console.log, '    single 3');
    sinon.assert.calledWithExactly(console.log, '    2nd level');
    sinon.assert.calledWithExactly(console.log, '        single 4');
    sinon.assert.calledWithExactly(console.log, '        single 5');
    sinon.assert.calledWithExactly(console.log, '        single 6');
    sinon.assert.calledWithExactly(console.log, '        3rd level');
    sinon.assert.calledWithExactly(console.log, '            single 7');
    sinon.assert.calledWithExactly(console.log, '            single 8');
    sinon.assert.calledWithExactly(console.log, '        3rd level');
    sinon.assert.calledWithExactly(console.log, '        single 9');
    sinon.assert.calledWithExactly(console.log, '    2nd level');
    sinon.assert.calledWithExactly(console.log, '    single 10');
    sinon.assert.calledWithExactly(console.log, '1st level');
    sinon.assert.calledWithExactly(console.log, 'single 11');
    sinon.assert.calledWithExactly(console.log, 'single 12');
  });
});