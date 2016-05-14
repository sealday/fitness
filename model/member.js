const mongoose = require('mongoose');
const User = require('./user');

let MemberSchema = new mongoose.Schema({
    course:[{type:Schema.Types.ObjectId,ref:'Course'}],
    records:{name:String,number:Number,price:Number,consumptiontime:timestamps}
});

let Member = User.discriminator('Member', MemberSchema);

module.exports = Member;