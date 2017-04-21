const express = require('express');
const router  = express.Router();
const  blogsController = require('../controllers/blogs');

router.get('/', (req, res) => res.render('statics/home'));
router.get('/blogs', blogsController.index);

module.exports = router;
