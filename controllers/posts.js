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
      .then(post => {
        res.redirect(`/blogs/${foundUser.blog}/posts/${post.id}`);
      })
      .catch(err => {
        const msgs = [];
        if (!req.body.title) req.flash('red', 'You must have a title, kupo!');
        else if (!req.body.body) req.flash('red', 'Post cannot be empty, kupo!');
        else if (!req.body.author) req.flash('red', 'Who are you posting as?');
        res.redirect(`/blogs/${foundUser.blog}/posts/new`);
        // res.status(500).render('error', { error: err });
      });
    });
}
function postsNew(req, res) {
  User
    .findById(req.session.userId)
    .populate('profile')
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
  let foundPost;
  Post
    .findById(req.params.id)
    .then(post => {
      if (!post) return res.status(404).render('error', { error: 'Post not found'});
      foundPost = post;
      console.log('POST', foundPost);
      Comment
        .find({ parentPost: req.params.id })
        .populate('author')
        .exec()
        .then(comments => {
          // console.log('ID', foundPost.id);
          // console.log('POST', foundPost);
          // console.log('COMMENTS', comments);
          res.render('posts/show', { post: foundPost, comments: comments });
        })
        .catch(err => {
          res.status(500).render('error', { error: err });
        });
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
