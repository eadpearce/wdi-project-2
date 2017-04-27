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
  // console.log('PARAMS', req.params);
  Profile
    .findById(req.params.id)
    .exec()
    .then(profile => {
      if (!profile) return res.status(404).render('error', { error: 'No profile found :('});
      for (const field in req.body) {
        // delete alts
        for (let i = 0; i < profile.alts.length; i++) {
          if (profile.alts[i] === field) {
            profile.alts.splice(i, 1);
          }
        }
        // add alts
        if (field === 'alts' && req.body.alts) {
          // don't add if character is already added
          if (profile.alts.indexOf(req.body.alts) !== -1) {
            req.flash('danger', 'Character already added, kupo!');
          } else profile.alts.push(req.body.alts);
          // update everything else
        } else if (req.body[field]) {
          profile[field] = req.body[field];
        }
      }
      req.flash('info', 'Profile updated, kupo!');
      // console.log('UPDATED PROFILE', profile);
      return profile.save();
    })
    .then(() => {
      res.redirect(`/profiles/${req.params.id}`); // then redirect back to the page after upodating
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
