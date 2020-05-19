const Profile = require('../models/Profile');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res.status(400).json({ msg: 'There is no profile for this user' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is requires').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const profileFields = buildProfileObject(req);

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          {
            new: true,
          }
        );
        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.status(200).json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/profile/user/user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found' });

    res.status(500).send('Server error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user, posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove user posts

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      descrition,
    } = req.body;

    const newExp = { title, company, location, from, to, current, descrition };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience = [newExp, ...profile.experience];
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   Delete api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // const removeIndex = profile.experience
    //   .map((item) => item.id)
    //   .indexOf(req.params.exp_id);

    // profile.experience.splice(removeIndex, 1);

    profile.experience = profile.experience.filter(
      (exp) => exp.id !== req.params.exp_id
    );

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

function buildProfileObject(req) {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Build profile object
  const profileObject = {};
  profileObject.user = req.user.id;
  if (company) profileObject.company = company;
  if (website) profileObject.website = website;
  if (location) profileObject.location = location;
  if (bio) profileObject.bio = bio;
  if (status) profileObject.status = status;
  if (githubusername) profileObject.githubusername = githubusername;
  if (skills) {
    profileObject.skills = skills.split(',').map((skill) => skill.trim());
  }
  // Build social object
  profileObject.social = {};
  if (youtube) profileObject.social.youtube = youtube;
  if (twitter) profileObject.social.twitter = twitter;
  if (facebook) profileObject.social.facebook = facebook;
  if (linkedin) profileObject.social.linkedin = linkedin;
  if (instagram) profileObject.social.instagram = instagram;

  return profileObject;
}
module.exports = router;
