const Blog = require('../models/blog');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

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
        .sort({ createdAt: 'descending' })
        .limit(5)
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
  let foundPost;
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
          foundPost = post;
          Comment
            .find({ parentPost: foundPost.id })
            .populate('author')
            .exec()
            .then(comments => {
              // console.log('COMMENTS', comments);
              res.render('posts/show', { blog: foundBlog, post: post, comments: comments });
            });
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
      res.render('posts/edit', { post });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function postsUpdate(req, res) {
  console.log('BODY', req.body);
  Post
    .findById(req.params.id)
    .exec()
    .then(post => {
      if (!post) return res.status(404).render('error', { error: 'No post found :('});
      for(const field in req.body) {
        post[field] = req.body[field];
      }
      return post.save();
    })
    .then(post => {
      res.redirect(`/blogs/${req.params.blogID}/posts/${post.id}`); // then redirect back to the page after upodating
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function postsDelete(req, res) {
  Post
    .findById(req.params.id)
    .exec()
    .then(post => {
      if (!post) return res.status(404).render('error', { error: 'No post found :('});
      return post.remove();
    })
    .then(() => {
      res.redirect(`/blogs/${req.params.blogID}/posts`);
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
module.exports = {
  new: postsNew,
  create: postsCreate,
  index: postsIndex,
  show: postsShow,
  update: postsUpdate,
  edit: postsEdit,
  delete: postsDelete
};
