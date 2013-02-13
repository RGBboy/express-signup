# Express Signup

  User Signup Component for your Express Application

  [![Build Status](https://secure.travis-ci.org/RGBboy/express-signup.png)](http://travis-ci.org/RGBboy/express-signup)

## Installation

  Works with Express 3.0.x

    npm install git://github.com/RGBboy/express-signup.git

## Usage

``` javascript
  var Signup = require('express-signup'),
      express = require('express'),
      mongoose = require('mongoose'),
      app = express(),
      namedRoutes = require('express-named-routes'),
      attach = require('attach'),
      shared = {
        model: function () {
          return mongoose.model.apply(mongoose, arguments);
        }
      },
      signup = Signup(shared);

  namedRoutes.extend(app);
  attach.extend(app);

  // Views
  self.set('views', __dirname + '/views');
  self.set('view engine', 'jade');
  self.set('view options', { layout: false });

  // Middleware
  self.use(express.bodyParser());
  self.use(express.cookieParser(config.cookieSecret));
  self.use(express.session({ cookie: { maxAge: 60000 }}));
  self.use(flash());

  // Component
  app.defineRoute('signup', '/some/url/to/signup/base');
  app.attach('signup', signup);
```

## Requires

### Middleware

  The following middleware should be used by the application before the 
  Signup Component:

  * express.bodyParser
  * express.cookieParser
  * express.session
  * express-flash

### Views

  The following views should be made available in your view directory:

  * ./signup

### Other

  Express Signup requires a shared object to be passed in upon construction.
  The shared object must implement a model method for retrieving models by name.
  Before attaching the Signup Component the model 'User' must be available
  from shared.model('User');

  The User Model needs to implement the following:

#### User.register(user, function (err, user) {})

  The `.register` method takes a user object as an argument and a 
  callback. The callback should respond with an error or the new user.

## Setting Up Development

  In order to develop and run tests with the supplied example you will 
  need to set up MongoDB with two databases:

  * express-signup-test
  * express-signup-dev

The usernames and passwords for each are the same as their database names.

## Todo

  * Change so the view shows nice errors to the user.
  * Double check that relaying the req.body.user to the signup view is 
    not a security risk.
  * Write process helpers for other components to use for integration tests.
  * Add restrictions to routes!
  * Make example use SSL

## License 

(The MIT License)

Copyright (c) 2012 RGBboy &lt;me@rgbboy.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.