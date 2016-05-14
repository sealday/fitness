const mongoose = require("mongoose");
// 错误类型
const et = require('../common/error').type;
// 错误对象工厂方法
const ef = require('../common/error').factory;
const ObjectId = mongoose.Schema.Types.ObjectId;


let CourseSchema = mongoose.Schema({
	name: { type: String, index: true},
	classtime:[{
		day: String,
		number: String
	}],
	students:[{type:ObjectId,ref:'Member'}],
	teacher:[{type:ObjectId,ref:'Coach'}]
}, {
	timestamps: true
});

CourseSchema.index({name:'text'});
/**
 * 订阅课程
 * @param user
 * @returns {Promise}
 */
CourseSchema.methods.subscribeBy = function(user) {
	return new Promise((resolve, reject) => {
		let course = this.model('Course');
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

/**
 * 添加一门课程
 * @param name
 * @param time
 * @returns {Promise}
 */
CourseSchema.methods.addCourse = function(name, time) {
	return new Promise((resolve,reject) => {
		let course = new Course({ name, time });
		course.save().then(c => {
			resolve(c);
		}).then(null, err => {
			reject(err);
		});
	});
}

/**
 * 按照名字搜索课程
 * @param keyword
 * @returns {Promise}
 */
CourseSchema.methods.findCourseByName = function (keyword) {
	return new Promise((resolve,reject) => {
		let course = this.model('Course');
		course.find({name:{$regex:keyword}}).then(c => {
			resolve(c);
		}).then(null,err => {
			reject(err);
		});
	});
}

/**
 * 删除课程
 * @returns {Promise}
 */
CourseSchema.methods.deleteCourse = function () {
	return new Promise((resolve,reject) => {
		let course = this.model('Course');
		course.remove().then(c => {
			resolve(c);
		}).then(null,err => {
			reject(err);
		});
	});
}

let Course = mongoose.model("Course", CourseSchema);

module.exports = Course;