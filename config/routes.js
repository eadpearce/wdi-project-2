const express = require('express');
const router  = express.Router();
const blogsController = require('../controllers/blogs');
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');
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

router.route('/blogs/:id')
  .post(blogsController.update)
  .get(blogsController.show);

router.route('/blogs/:id/posts/new')
  .get(secureRoute, postsController.new);

router.route('/blogs/:id/posts')
  .get(postsController.index)
  .post(secureRoute, postsController.create);

router.route('/blogs/:blogID/posts/:id')
  .delete(secureRoute, postsController.delete)
  .put(secureRoute, postsController.update)
  .get(postsController.show);

router.route('/blogs/:blogID/posts/:id/edit')
  .delete(secureRoute, postsController.delete)
  .get(secureRoute, postsController.edit);

router.route('/blogs/:blogID/posts/:postID/comments/new')
  .get(secureRoute, commentsController.new);

router.route('/blogs/:blogID/posts/:postID/comments')
  .post(secureRoute, commentsController.create);

router.route('/blogs/:blogID/posts/:postID/comments/:commentID')
  .put(commentsController.update)
  .post(commentsController.createThread)
  .delete(commentsController.delete)
  .get(commentsController.show);

router.route('/blogs/:blogID/posts/:postID/comments/:commentID/new')
  .get(secureRoute, commentsController.newThread);

router.route('/blogs/:blogID/posts/:postID/comments/:commentID/edit')
  .get(secureRoute, commentsController.edit);

router.route('/profiles')
  .get(profilesController.index);

router.route('/profiles/:id')
  .put(secureRoute, profilesController.update)
  .get(profilesController.show);

router.route('/profiles/:id/edit')
  .get(secureRoute, profilesController.edit);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/logout')
  .get(sessionsController.delete);

module.exports = router;
