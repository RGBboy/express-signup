/*!
 * express-signup
 * Copyright(c) 2012 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
 * Module Dependencies
 */

var EventEmitter = require('events').EventEmitter,
    routable = require('routable'),
    Controller = require('./controller');

/**
 * Return a signup instance
 *
 * @param {Object} shared
 * @return {Object} self
 * @api public
 */

exports = module.exports = function (shared) {

  var self = new EventEmitter(),
      User;

  routable.extend(self);

  function attach() {

    var controller = Controller(shared.model('User'));

    // Define Named Routes
    self.defineRoute('new', '/');
    self.defineRoute('create', '/');

    // Attach controllers
    // These should be restricited to un authenticated users.
    self.get(self.lookupRoute('new'), controller.new);
    self.post(self.lookupRoute('create'), controller.create);

    self.emit('ready', self);

  };

  self.on('attached', attach);

  process.nextTick(function () {
    self.emit('init', self);
  });

  return self;

};

/**
 * Library version.
 */

exports.version = '0.0.2';