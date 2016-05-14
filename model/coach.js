const mongoose = require("mongoose");
const User = require('./user')

let CoachSchema = mongoose.Schema({
    teachCourse :[{type:Schema.Types.ObjectId,ref:'Course'}],
    teachMember : [{type:Schema.Types.ObjectId,ref:'Member'}],
});

let Coach = User.discriminator("Coach", CoachSchema);

module.exports = Coach;