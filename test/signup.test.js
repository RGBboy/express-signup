/**
 * Module dependencies.
 */

var should = require('should'),
    signup = require('../');

describe('Signup', function () {

  describe('.version', function () {

    it('should match the format x.x.x', function (done) {
      signup.version.should.match(/^\d+\.\d+\.\d+$/);
      done();
    });

  });

});