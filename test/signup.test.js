/**
 * Express Signup Unit Tests
 */

/**
 * Module dependencies.
 */

var should = require('should'),
    signup = require('../');

/**
 * Tests
 */

describe('Sign Up', function () {

  describe('.version', function () {

    it('should match the format x.x.x', function (done) {
      signup.version.should.match(/^\d+\.\d+\.\d+$/);
      done();
    });

  });

});