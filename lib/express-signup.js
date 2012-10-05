/*!
 * express-signup
 * Copyright(c) 2012 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
 * Module Dependencies
 */

var routable = require('routable'),
    Controller = require('./controller');

/**
 * Return a middleware function
 *
 * @param {String} route
 * @return {Function} middleware function
 * @api public
 */

exports = module.exports = function (route, User) {

  var component = routable(route),
      controller = Controller(User);

  // Attach controllers
  // These should be restricited to un authenticated users.
  component.get(component.lookupRoute('index'), controller.new);
  component.post(component.lookupRoute('index'), controller.create);

  return component;

};

/**
 * Library version.
 */

exports.version = '0.0.1';