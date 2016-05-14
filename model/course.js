const mongoose = require("mongoose");

let CourseSchema = mongoose.Schema({
	name: { type: String, index: true}
}, {
	timestamps: true
});

let Course = mongoose.model("Course", CourseSchema);

module.exports = Course;