const express = require('express');
const router  = express.Router();
const blogsController = require('../controllers/blogs');
const postsController = require('../controllers/posts');
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const profilesController = require('../controllers/profiles');
const usersController = require('../controllers/users');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to do that...');
      res.redirect('/login');
    });
  }
  next();
}

router.get('/', (req, res) => {
  res.render('statics/home');
});

router.route('/blogs')
  .get(blogsController.index);

router.route('/posts')
  .post(postsController.create);
router.route('/posts/new')
  .get(secureRoute, postsController.new);

router.route('/blogs/:id')
  .get(blogsController.show);

router.route('/profiles')
  .get(profilesController.index);

router.route('/account')
  .get(secureRoute, usersController.edit)
  .put(secureRoute, profilesController.update);

router.route('/profiles/:id')
  .post(secureRoute, profilesController.update)
  .get(profilesController.show);

router.route('/profiles/:id/edit')
  .get(profilesController.edit);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/logout')
  .get(sessionsController.delete);

module.exports = router;
