const Blog = require('../models/blog');

function blogsIndex(req,res) {
  Blog
    .find()
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
    .exec()
    .then(blog => {
      if (!blog) return res.status(404).render('error', { error: 'Not found'});
      res.render('blogs/show', { blog });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
module.exports = {
  index: blogsIndex,
  show: blogsShow
};
