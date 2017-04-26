const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      // console.log(user);
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('red', 'Invalid login details!');
        return res.redirect('/login');
      }
      req.session.userId = user._id;
      req.flash('blue', `Welcome back, ${user.username}.`);
      res.redirect('/');
    })
    .catch(next);
}

function sessionsDelete(req, res) {
  return req.session.regenerate(() => {
    req.flash('info', 'Goodbye.');
    res.redirect('/');
  });
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
