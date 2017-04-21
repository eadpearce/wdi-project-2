const mongoose   = require('mongoose');
const env        = require('../config/env');
mongoose.Promise = require('bluebird');

mongoose.connect(env.db);

const Blog = require('../models/blog');

Blog.collection.drop();

Blog
  .create([{
    title: 'An Example Blog',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'kenji',
    comments: [{
      body: 'Lorem ipsum dolor sit amet.',
      author: 'noah'
    }, {
      body: 'Consectetur adipisicing elit...',
      author: 'james'
    }, {
      body: 'Excepteur sint occaecat cupidatat non proident.',
      author: 'klyn'
    }]
  }, {
    title: 'Another Example Blog',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'klyn',
    comments: [{
      body: 'Duis aute irure dolor in reprehenderit.',
      author: 'kenji'
    }, {
      body: 'Quis nostrud exercitation ullamco laboris.',
      author: 'james'
    }]
  }
  ])
  .then((blogs) => {
    console.log(`${blogs.length} blogs created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
