const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}
function createRoute(req, res) {
  User
  .create(req.body)
  .then(user => {
    // newUser.save();
    // console.log('USER', user);
    req.flash('info', 'Thank you for registering. Please log in.');
    res.redirect('/login');
  })
  .catch((err) => {
    console.log(err);
    if(err.name === 'ValidationError') {
      res.redirect('/register');
    }
    res.status(500).end();
  });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
