const express = require("express");
const mongoose = require("mongoose");
const router = require('./route');

mongoose.connect("mongodb://localhost/fitness");

let app = express();
app.use(express.static(`${__dirname}/public`));
app.use(router);

app.use((req, res) => {
	res.status(404);
	res.json({
		message: "页面没有找到"
	});
});

app.use((err, req, res) => {
	res.status(500);
	res.json({
		message: "系统内部错误"
	});
});

app.listen(5000);
