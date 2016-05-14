const mongoose = require('mongoose');
const User = require('./user');

let MemberSchema = new mongoose.Schema({
});

let Member = User.discriminator('Member', MemberSchema);

module.exports = Member;