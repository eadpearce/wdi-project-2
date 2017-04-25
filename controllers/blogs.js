const Blog = require('../models/blog');

function blogsIndex(req,res) {
  Blog
    .find()
    .populate('owner profile')
    .exec()
    .then(blogs => {
      console.log({ blogs });
      res.render('blogs/index', { blogs } );
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function blogsShow(req, res) {
  Blog
    .findById(req.params.id)
    .populate('owner profile')
    .exec()
    .then(blog => {
      if (!blog) return res.status(404).render('error', { error: 'Not found'});
      res.render('blogs/show', { blog });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function blogsEdit(req, res) {
  Blog
    .findById(req.params.id)
    .populate('owner profile')
    .then(blog => {
      if (!blog) return res.status(404).render('error', { error: 'ERROR'});
      console.log('PROFILE', blog.profile);
      res.render('blogs/edit', { blog });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function blogsUpdate(req, res) {
  console.log('BODY', req.body);
  Blog
    .findByIdAndUpdate(
      req.body.blog, { $push: {'posts': {
        title: req.body.title,
        body: req.body.body,
        owner: req.body.owner,
        profile: req.body.profile,
        author: req.body.username }
      }})
    .exec()
    .then(() => {
      res.redirect(`/blogs/${req.body.blog}`); // then redirect back to the page after upodating
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('error', { error: err });
    });
}
module.exports = {
  index: blogsIndex,
  show: blogsShow,
  update: blogsUpdate,
  edit: blogsEdit
};
