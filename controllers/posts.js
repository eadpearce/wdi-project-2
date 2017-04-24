const Post = require('../models/post');
const User = require('../models/user');

function postsCreate(req, res) {
  Post
  .create(req.body)
  .then(() => {
    res.redirect('/posts');
  });
}

function postsNew(req, res) {
  User // make user and profile data available when making a new post 
    .findById(req.session.userId)
    .populate('profile')
    .then(user => {
      res.render('posts/new', { user });
    });
}

function postsIndex(req,res) {
  Post
    .find()
    .exec()
    .then(posts => {
      console.log({ posts });
      res.render('posts/index', { posts } );
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function postsShow(req, res) {
  Post
    .findById(req.params.id)
    .exec()
    .then(post => {
      if (!post) return res.status(404).render('error', { error: 'Not found'});
      res.render('posts/show', { post });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

module.exports = {
  index: postsIndex,
  show: postsShow,
  new: postsNew,
  create: postsCreate
};
