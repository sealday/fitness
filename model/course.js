const mongoose = require("mongoose");
// 错误类型
const et = require('../common/error').type;
// 错误对象工厂方法
const ef = require('../common/error').factory;

let CourseSchema = mongoose.Schema({
	name: { type: String, index: true},
	classtime:[{day:String,number:String}],
	students:[{type:Schema.Types.ObjectId,ref:'Member'}],
	teacher:[{type:Schema.Types.ObjectId,ref:'Coach'}]
}, {
	timestamps: true
});

CourseSchema.methods.subscribeBy = function(user) {
	return new Promise((resolve, reject) => {
		let course = this.model('course');
		course.students.push(user._id);
		course.save()
			.then(res => {
				console.log(res);
				resolve(true);
			})
			.then(null, err => {
				reject(ef(err));
			});
	});
};

let Course = mongoose.model("Course", CourseSchema);

module.exports = Course;