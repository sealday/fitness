const mongoose = require("mongoose");

const Staff = require("./model/Staff");
const Member = require("./model/Member");

mongoose.connect("mongodb://localhost/fitness");



let staff = new Staff();

staff.findUser("a", "b").then(a => {
	console.log("done");
}, e => {
	console.log("error");
});