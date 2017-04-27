const mongoose   = require('mongoose');
const env        = require('../config/env');
mongoose.Promise = require('bluebird');

mongoose.connect(env.db);

const Blog = require('../models/blog');
const User = require('../models/user');
const Profile = require('../models/profile');
const Comment = require('../models/profile');
const Post = require('../models/profile');

Blog.collection.drop();
User.collection.drop();
Profile.collection.drop();
Comment.collection.drop();
Post.collection.drop();

User
  .create({
    username: 'klyn',
    email: 'klynthota.drysfalkwyn@eorzea.com',
    password: '$2a$08$Hvs1CMI.VeGo9GCUoGuepON/JJPwn32jaeyCI4gDWfEhNKym2ZVnq',
  })
  .then((blogs) => {
    console.log(`${blogs.length} blogs created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
