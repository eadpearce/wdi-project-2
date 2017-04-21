const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  body: { type: String, required: true, unique: true },
  author: { type: String },
  comments: [{
    body: { type: String },
    author: { type: String }
  }]
});

module.exports = mongoose.model('Blog', blogSchema);
