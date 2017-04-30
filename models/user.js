const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Profile = require('../models/profile');
const Blog = require('../models/blog');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.ObjectId, ref: 'Profile' },
  blog: { type: mongoose.Schema.ObjectId, ref: 'Blog' }
}, { timestamps: true });

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  let newProfile;
  Profile
    .create({ owner: this.id })
    .then(profile => {
      newProfile = profile;
      this.profile = profile.id;
      // console.log('PROFILE', profile);
    })
    .then(() => {
      Blog
        .create({ owner: this.id, profile: newProfile.id })
        .then(blog => {
          this.blog = blog.id;
          // console.log('BLOG', blog);
          console.log('NEW USER', this);
        })
        .then(() => {
          next();
        });
    });
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
