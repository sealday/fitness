const express = require("express");
const mongoose = require("mongoose");
const app = express();

const Staff = require("./model/Staff");
const Member = require("./model/Member");

mongoose.connect("mongodb://localhost/fitness");

let seal = new Staff({username: "seal", password: "hello"});
seal.save(e => {
	if (e) {
		console.log(e);
	} else {
		console.log("success");
	}

	seal.findUser("hello", "world");
});


app.use(express.static(`${__dirname}/public`));

app.listen(5000);
