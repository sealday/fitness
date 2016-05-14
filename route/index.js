const router = require('express').Router();

const user = require('./user');
const staff = require('./staff');
const member = require('./member');
const coach = require('./coach');
const course = require('./course');

router.use('/', user);
router.use('/staffs', staff);
router.use('/members', member);
router.use('/coaches', coach);
router.use('/courses', course);

module.exports = router;