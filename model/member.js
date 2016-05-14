const mongoose = require('mongoose');
const User = require('./user');
const Course = require('./course');
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

/**
 * 学生选课
 * @param courseid
 * @returns {Promise}
 */
MemberSchema.methods.selectCourse = function (courseid) {
	return new Promise((resolve,reject)=>{
		Course.findOne({_id:courseid}).then(c =>{
			c.students.push(this._id);
			this.course.push(c._id);
			c.save().then(res => {
				return this.save();
			}).then(res => {
				resolve(res);
			}).then(null,err => {
				reject(err);
			});
		}).then(null,err => {
			console.log(err);
			reject(err);
		});
	});
}


/**
 * 会员增加消费记录(测试未通过)
 * @param name
 * @param number
 * @param price
 * @param username
 * @returns {Promise}
 */
MemberSchema.methods.addRecords = function (name,number,price,username) {
	return new Promise((resolve,reject)=>{
		let member = new Member({username});

		member.save({records:{name:name,number:number,price:price}}).then(m => {
			console.log(m);
			resolve(m);
			
		}).then(null,err=>{
			console.log(err);
			reject(err);
		});
	});

}


let Member = User.discriminator('Member', MemberSchema);

module.exports = Member;