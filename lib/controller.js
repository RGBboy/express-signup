/**
 * Signup Controller
 *
 * @todo: Change so the view shows nice errors to the user.
 * @todo: Double check that relaying the req.body.user to 
 *        the signup view is not a security risk.
 */

/**
 * Module Exports
 */

exports = module.exports = function (User) {
  
  var controller = {};
  
  controller.new = function (req, res) {
    res.render('signup', {
      title: 'Sign Up',
      user: {}
    });
  };

  controller.create = function (req, res) {
    if (!req.body.user) {
      req.flash('error', 'Something went wrong. Please try again.');
      res.redirect(req.routeToPath('signup'));
      return;
    };
    User.register(req.body.user, function (err, user) {
      if (err) {
        // Here we should be looking at the errors and giving the user
        // feedback accordingly.
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect(req.routeToPath('signup'));
        return;
      }
      req.flash('info', 'You have successfully signed up!');
      res.redirect('/');
    });
  };

  return controller;

};