const express = require("express");
const mongoose = require("mongoose");
const router = require('./route');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost/fitness");

let app = express();
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(router);

app.use((req, res) => {
	res.status(404);
	res.json({
		message: "页面没有找到"
	});
});

app.use((err, req, res) => {
	res.status(res.status || 500);
	res.json({
		message: err
	});
	console.log(err);
});

app.listen(5000);
