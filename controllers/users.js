const User = require('../models/user');

function usersIndex(req,res) {
  User
    .find()
    .populate('user') // get the info from the user reference when u view the page
    .then(users => {
      console.log({ users });
      res.render('users/index', { users } );
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function usersShow(req, res) {
  User
    .findById(req.params.id)
    .populate('user') // get the info from the user reference when u view the page
    .then(user => {
      if (!user) return res.status(404).render('error', { error: 'ERROR'});
      res.render('users/show', { user });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function usersEdit(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).render('error', { error: 'ERROR'});
      res.render('users/edit', { user });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function usersUpdate(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      console.log(user);
      console.log(req.body);
      if (!user) return res.status(404).render('error', { error: 'No user found :('});
      user.profile.about = req.body.about;
      user.profile.age = req.body.age;
      user.profile.main = req.body.main;
      return user.save();
    })
    .then(user => {
      res.redirect(`/users/${user.id}`); // then redirect back to the page after upodating
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('error', { error: err });
    });
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  edit: usersEdit,
  update: usersUpdate
};
