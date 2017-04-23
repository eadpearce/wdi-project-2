const Profile = require('../models/profile');

function profilesIndex(req,res) {
  Profile
    .find()
    .populate('owner') // get the info from the profile reference when u view the page
    .then(profiles => {
      res.render('profiles/index', { profiles } );
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function profilesShow(req, res) {
  Profile
    .findById(req.params.id)
    .populate('owner') // get the info from the profile reference when u view the page
    .then(profile => {
      if (!profile) return res.status(404).render('error', { error: 'ERROR'});
      res.render('profiles/show', { profile });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function profilesEdit(req, res) {
  Profile
    .findById(req.params.id)
    .exec()
    .then(profile => {
      if (!profile) return res.status(404).render('error', { error: 'ERROR'});
      res.render('profiles/edit', { profile });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}
function profilesUpdate(req, res) {
  Profile
    .findById(req.params.id)
    .exec()
    .then(profile => {
      console.log(profile);
      console.log(req.body);
      if (!profile) return res.status(404).render('error', { error: 'No profile found :('});
      for (const field in req.body) {
        profile[field] = req.body[field];
      }
      return profile.save();
    })
    .then(profile => {
      res.redirect(`/profiles/${profile.id}`); // then redirect back to the page after upodating
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('error', { error: err });
    });
}

module.exports = {
  index: profilesIndex,
  show: profilesShow,
  edit: profilesEdit,
  update: profilesUpdate
};
