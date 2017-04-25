const Blog = require('../models/blog');

function postsIndex(req,res) {
  Blog
    .find()
    .populate('owner profile')
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
  Blog
    .findById(req.params.blogID)
    .populate('owner profile')
    .exec()
    .then(blog => {
      if (!blog) return res.status(404).render('error', { error: 'Not found'});
      res.render('posts/show', { blog });
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
  index: postsIndex,
  show: postsShow,
  update: postsUpdate,
  edit: postsEdit
};
