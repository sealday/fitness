const express = require('express');
const Course = require('../model/course');
let router = express.Router();


router.post('/login', (req, res) => {
	
});

// 用来拦截请求，查看是否包含了用户信息，如果不包含，在这之后
// 的请求都不能进行
// 如果包含的话，将在 req 中添加上用户的信息
router.use((req, res) => {
	let token = req.headers['token'];
	if (token) {

	} else {
		res.status(403);
		next("没有权限进行该请求");
	}
});


module.exports = router;