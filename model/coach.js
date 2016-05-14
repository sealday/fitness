const mongoose = require("mongoose");
const User = require('./user')

let CoachSchema = mongoose.Schema({
});

let Coach = User.discriminator("Coach", CoachSchema);

module.exports = Coach;