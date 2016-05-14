const mongoose = require("mongoose");

let CourseSchema = mongoose.Schema({
	name: { type: String, index: true},
	classtime:[{day:String,number:String}],
	students:[{type:Schema.Types.ObjectId,ref:'Member'}],
	teacher:[{type:Schema.Types.ObjectId,ref:'Coach'}]
}, {
	timestamps: true
});

let Course = mongoose.model("Course", CourseSchema);

module.exports = Course;