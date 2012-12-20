/**
 * Express Signup Unit Tests
 */

/**
 * Module dependencies.
 */

var should = require('should'),
    Signup = require('../');

/**
 * Tests
 */

describe('Sign Up', function () {

  describe('.version', function () {

    it('should match the format x.x.x', function (done) {
      Signup.version.should.match(/^\d+\.\d+\.\d+$/);
      done();
    });

  });

});