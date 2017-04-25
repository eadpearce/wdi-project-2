const Blog = require('../models/blog');
const Post = require('../models/post');

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
  let foundBlog;
  Blog
    .findById(req.params.id)
    .populate('owner profile')
    .exec()
    .then(blog => {
      foundBlog = blog;
      Post
        .findOne({ blog: req.params.id }, {}, { sort: { 'created_at': -1 } }, function(err, post) {
          console.log(post);
          if (!foundBlog) return res.status(404).render('error', { error: 'Blog not found'});
          res.render('blogs/show', { blog: foundBlog, post: post });
        });
      // Post
      //   .findOne({ blog: req.params.id })
      //   .exec()
      //   .then(posts => {
      //     console.log(posts);
      //     if (!foundBlog) return res.status(404).render('error', { error: 'Blog not found'});
      //     res.render('blogs/show', { blog: foundBlog, posts: posts });
      //   });
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
      // console.log('PROFILE', blog.profile);
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
