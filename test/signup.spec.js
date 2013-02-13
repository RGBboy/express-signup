/**
 * Express SignUp Spec
 *
 * @todo write process helpers
 * @todo remove tests that should be in the model
 */

/**
 * Module dependencies.
 */

var App = require('../example/app'),
    mongoose = require('mongoose'),
    request = require('superagent'),
    should = require('should');

/**
 * Tests
 */

describe('Sign Up', function () {

  var app,
      UserModel,
      baseURL,
      signupURL,
      signupPath,
      server;

  before(function (done) {

    app = App();

    app.on('ready', function () {
      UserModel = mongoose.model('User');
      if (!app.address) {
        var port = 8000;
        server = app.listen(port);
        baseURL = 'http://localhost:' + port;
      } else {
        baseURL = 'http://localhost:' + app.address().port;
      };

      signupPath = '/signup';
      signupURL = baseURL + signupPath;

      done();
    });

  });

  beforeEach(function (done) {
    UserModel.remove(done);
  });

  after(function (done) {
    server.close(done);
  })

  describe('GET /signup', function () {

    it('should render the signup page', function (done) {
      request
        .get(signupURL)
        .redirects(0)
        .end(function (err, res) {
          res.statusCode.should.equal(200);
          res.text.should.include('<title>Sign Up</title>');
          // should have a form with email, password and passwordConfirm field
          done();
        })
    });

  });

  describe('POST /signup', function () {

    var fakeUser = {};

    beforeEach(function (done) {
      fakeUser.email = 'TestUser@test.com'
      fakeUser.password = 'TestPassword';
      fakeUser.passwordConfirm = 'TestPassword';
      done();
    });

    describe('when correct crudentials are POSTed', function () {

      it('should create a new user', function (done) {
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.text.should.include('You have successfully signed up!');
            UserModel.find({}, function(err, users) {
              users.length.should.equal(1);
              done();
            });
          });
      });

      it('should redirect to /', function (done) {
        request
          .post(signupURL)
          .redirects(0)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.statusCode.should.equal(302)
            res.headers.should.have.property('location').match(/\/$/);
            done();
          });
      });

      it('should show an error if the user already exists', function (done) {
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            request.agent()
              .post(signupURL)
              .send({ 
                user: fakeUser
              })
              .end(function (err, res) {
                res.text.should.include('<title>Sign Up</title>')
                res.text.should.include('Something went wrong. Please try again.');
                UserModel.find({}, function(err, users) {
                  users.length.should.equal(1);
                  done();
                });
              })
          });
      });

    });

    describe('when nothing is POSTed', function () {

      it('should redirect back to /signup', function (done) {
        request.agent()
          .post(signupURL)
          .redirects(0)
          .send({})
          .end(function (err, res) {
            res.headers.should.have.property('location').match(new RegExp(signupPath + '$'));
            res.statusCode.should.equal(302)
            done();
          });
      });

      it('should show an error', function (done) {
        request.agent()
          .post(signupURL)
          .send({})
          .end(function (err, res) {
            res.text.should.include('<title>Sign Up</title>')
            res.text.should.include('Something went wrong. Please try again.');
            done();
          });
      });

    });

    describe('when incorrect crudentials are POSTed', function () {

      it('should redirect back to signup route', function (done) {
        request.agent()
          .post(signupURL)
          .redirects(0)
          .send({ 
            user: {}
          })
          .end(function (err, res) {
            res.headers.should.have.property('location').match(new RegExp(signupPath + '$'));
            res.statusCode.should.equal(302)
            done();
          });
      });

      it('should show an error if email is missing', function (done) {
        delete fakeUser.email;
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign Up</title>')
            res.text.should.include('Something went wrong. Please try again.');
            done();
          });
      });

      it('should show an error if email is empty', function (done) {
        fakeUser.email = '';
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign Up</title>')
            res.text.should.include('Something went wrong. Please try again.');
            done();
          });
      });

      it('should show an error if email is invalid', function (done) {
        fakeUser.email = 'testtest.com';
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign Up</title>')
            res.text.should.include('Something went wrong. Please try again.');
            done();
          });
      });

      it('should show an error if password is missing', function (done) {
        delete fakeUser.password;
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign Up</title>')
            res.text.should.include('Something went wrong. Please try again.');
            done();
          });
      });

      it('should show an error if password is empty', function (done) {
        fakeUser.password = '';
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign Up</title>')
            res.text.should.include('Something went wrong. Please try again.');
            done();
          });
      });

      it('should show an error if passwordConfirm is missing', function (done) {
        delete fakeUser.passwordConfirm;
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign Up</title>')
            res.text.should.include('Something went wrong. Please try again.');
            done();
          });
      });

      it('should show an error if passwordConfirm is empty', function (done) {
        fakeUser.passwordConfirm = '';
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign Up</title>')
            res.text.should.include('Something went wrong. Please try again.');
            done();
          });
      });

      it('should show an error if password does not match passwordConfirm', function (done) {
        fakeUser.password = 'TestPassword';
        fakeUser.passwordConfirm = 'NotTestPassword';
        request.agent()
          .post(signupURL)
          .send({ 
            user: fakeUser
          })
          .end(function (err, res) {
            res.text.should.include('<title>Sign Up</title>')
            res.text.should.include('Something went wrong. Please try again.');
            done();
          });
      });

    });

  });

});