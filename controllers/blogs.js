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

module.exports = {
  index: blogsIndex
};
