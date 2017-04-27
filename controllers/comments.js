const Blog = require('../models/blog');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

function commentsCreate(req, res) {
  let foundPost;
  Post
    .findById(req.params.postID)
    .exec()
    .then(post => {
      foundPost = post;
      return Comment.create(req.body);
    })
    .then(comment => {
      comment.replyLevel = 0;
      res.redirect(`/blogs/${foundPost.blog}/posts/${foundPost.id}`);
    })
    .catch(err => {
      if (!req.body.body) req.flash('red', 'Comment cannot be empty, kupo!');
      else if (!req.body.author) req.flash('red', 'Who are you posting as?');
      res.redirect(`/blogs/${foundPost.blog}/posts/${foundPost.id}/comments/new`);
      res.status(500).render('error', { error: err });
    });
}
function commentsCreateThread(req, res) {
  console.log('REQ BODY', req.body);
  let parentComment, replyLevel;
  Comment
    .findById(req.params.commentID)
    .exec()
    .then(comment => {
      parentComment = comment;
      replyLevel = parentComment.replyLevel;
      Comment
      .create(req.body, {replyLevel: replyLevel+1})
      .then(comment => {
        comment.replyLevel = parentComment.replyLevel+1;
        res.redirect(`/blogs/${comment.parentBlog}/posts/${comment.parentPost}`);
        console.log('COMMENT', comment);
        return comment.save();
      });
    });
}
function commentsNew(req, res) {
  let foundUser;
  User
    .findById(req.session.userId)
    .populate('blog profile')
    .then(user => {
      foundUser = user;
      Post
        .findById(req.params.postID)
        .then(post => res.render('comments/new', { user: foundUser, post: post }));
    });
}

function commentsNewThread(req, res) {
  let foundUser;
  User
    .findById(req.session.userId)
    .populate('blog profile')
    .then(user => {
      foundUser = user;
      Comment
        .findById(req.params.commentID)
        .then(parentComment => {
          res.render('comments/newthread', { parentComment: parentComment, user: foundUser });
        });
    });
}

function commentsIndex(req,res) {
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
        .then(comments => {
          res.render('comments/index', { comments: comments, blog: foundBlog } );
        });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function commentsShow(req, res) {
  let foundBlog;
  Blog
    .findById(req.params.blogID)
    .populate('owner profile')
    .exec()
    .then(blog => {
      foundBlog = blog;
      if (!blog) return res.status(404).render('error', { error: 'Blog not found'});
      Post
        .findById(req.params.postID)
        .exec()
        .then(post => {
          Comment
            .findById(req.params.commentID)
            .populate('owner')
            .exec()
            .then(comment => {
              res.render('comments/show', { blog: foundBlog, post: post, comment: comment });
            });
        });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function commentsEdit(req, res) {
  let foundUser;
  User
    .findById(req.session.userId)
    .populate('profile')
    .then(user => {
      foundUser = user;
      Comment
        .findById(req.params.commentID)
        .populate('owner')
        .then(comment => {
          console.log('COMMENT', comment);
          if (!comment) return res.status(404).render('error', { error: 'ERROR'});
          res.render('comments/edit', { comment: comment, user: user });
        })
        .catch(err => {
          res.status(500).render('error', { error: err });
        });
    });

}
function commentsUpdate(req, res) {
  console.log('BODY', req.body);
  Comment
    .findById(req.params.commentID)
    .exec()
    .then(comment => {
      console.log(comment);
      if (!comment) return res.status(404).render('error', { error: 'No comment found :('});
      for(const field in req.body) {
        comment[field] = req.body[field];
      }
      return comment.save();
    })
    .then(comment => {
      res.redirect(`/blogs/${comment.parentBlog}/posts/${comment.parentPost}/comments/${comment.id}`); // then redirect back to the page after upodating
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('error', { error: err });
    });
}
function commentsDelete(req, res) {
  Comment
    .findById(req.params.commentID)
    .exec()
    .then(comment => {
      if (!comment) return res.status(404).render('error', { error: 'No comment found :('});
      return comment.remove();
    })
    .then(() => {
      res.redirect(`/blogs/${req.params.blogID}/posts/${req.params.postID}`);
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
module.exports = {
  new: commentsNew,
  newThread: commentsNewThread,
  create: commentsCreate,
  createThread: commentsCreateThread,
  index: commentsIndex,
  show: commentsShow,
  update: commentsUpdate,
  edit: commentsEdit,
  delete: commentsDelete
};
