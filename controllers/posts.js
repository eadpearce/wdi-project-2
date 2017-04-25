const Blog = require('../models/blog');
const Post = require('../models/post');
const User = require('../models/user');

function postsCreate(req, res) {
  let foundUser;
  User
    .findById(req.session.userId)
    .exec()
    .then(user => {
      foundUser = user;
      Post
      .create(req.body)
      .then(() => {
        res.redirect(`/blogs/${foundUser.blog}`);
      });
    });
}
function postsNew(req, res) {
  User
    .findById(req.session.userId)
    .populate('blog profile')
    .then(user => res.render('posts/new', { user }));
}
function postsIndex(req,res) {
  let foundBlog;
  Blog
    .findById(req.params.id)
    .populate('owner profile')
    .exec()
    .then(blog => {
      foundBlog = blog;
      Post
        .find({ blog: foundBlog.id })
        .exec()
        .then(posts => {
          res.render('posts/index', { posts: posts, blog: foundBlog } );
        });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function postsShow(req, res) {
  let foundBlog;
  Blog
    .findById(req.params.blogID)
    .populate('owner profile')
    .exec()
    .then(blog => {
      foundBlog = blog;
      if (!blog) return res.status(404).render('error', { error: 'Blog not found'});
      Post
        .findById(req.params.id)
        .exec()
        .then(post => {
          res.render('posts/show', { blog: foundBlog, post: post });
        });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function postsEdit(req, res) {
  Post
    .findById(req.params.id)
    .populate('owner profile')
    .then(post => {
      if (!post) return res.status(404).render('error', { error: 'ERROR'});
      console.log('PROFILE', post.profile);
      res.render('posts/edit', { post });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function postsUpdate(req, res) {
  console.log('BODY', req.body);
  Post
    .findByIdAndUpdate(
      req.body.post, { $push: {'posts': {
        title: req.body.title,
        body: req.body.body,
        owner: req.body.owner,
        profile: req.body.profile,
        author: req.body.username }
      }})
    .exec()
    .then(() => {
      res.redirect(`/posts/${req.body.post}`); // then redirect back to the page after upodating
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('error', { error: err });
    });
}
module.exports = {
  new: postsNew,
  create: postsCreate,
  index: postsIndex,
  show: postsShow,
  update: postsUpdate,
  edit: postsEdit
};
