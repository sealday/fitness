const mongoose = require('mongoose');
const User = require('./user');
const ObjectId = mongoose.Schema.Types.ObjectId;

let MemberSchema = new mongoose.Schema({
    course: [{ type: ObjectId, ref: 'Course' }],
    // 消费记录
    records: { 
    	name: String, 
    	number: Number, 
    	price: Number, 
    	// 消费时间
    	time: { type: Date, default: new Date() }
    }
});



let Member = User.discriminator('Member', MemberSchema);

module.exports = Member;