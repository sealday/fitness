const mongoose = require("mongoose");

const Staff = require("./model/Staff");
const Member = require("./model/Member");

mongoose.connect("mongodb://localhost/fitness-test");



let staff = new Staff();

staff
	.addUser("seal", "..xiao")
	.then(result => {
		console.log(result);
	})
	.then(null, err => {
		console.log(err);
	});

// staff.findUser("a", "b").then(user => {
// 	console.log(user);
// 	user.token = "******"
// 	user.save().then(res => {
// 		user.token = "save begin ----";
// 		console.log(user)
// 		console.log(res);
// 		user.token = "save end ----";
// 	})
// 	.then(null, err => {
// 		console.log(err);
// 	})
// 	console.log("done");
// }, e => {
// 	console.log(e);
// 	console.log("error");
// });