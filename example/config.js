var environment =  process.env.NODE_ENV || 'development';

var config = {
  development: {
    cookieSecret: '23vdh23llfk949038hckjd3',
    db: {
      url: 'mongodb://express-signup-dev:express-signup-dev@localhost/express-signup-dev'
    }
  },
  test: {
    cookieSecret: '23vdh23llfk949038hckjd3',
    db: {
      url: 'mongodb://express-signup-test:express-signup-test@localhost/express-signup-test'
    }
  }
};

exports = module.exports = config[environment];