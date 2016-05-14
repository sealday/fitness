const express = require('express');
const Course = require('../model/course');
let router = express.Router();

router.route('/')
	// 获取课程列表
	.get((req, res) => {
		res.json("get");
	})
	// 添课程加
	.post((req, res) => {
		res.json("post");
	})
	// 删课程除
	.delete((req, res) => {
		res.json("delete")
	})

router.param('id', (req, res, next, id) => {
	let course = new Course();
	course.findById(id)
		.then(c => {
			if (c != null) {
				req.course = c;
				next();
			} else {
				res.status(404)
				next("这个课程号不存在");
			}
		})
		.then(null, e => {
			next(e);
		})
});

// 具体课程路由
router.route('/:id')
	// 获取课程详情
	.get((req, res) => {
		res.json("get id");
	})
	// 获取更新某个课程资料
	.put((req, res) => {
		res.json("put id");
	});

router.post('/:id/subscribe', (req, res) => {
	let user = req.user
	let course = req.course;

	course
		.subscribeBy(user)
		.then(result => {
			if (result) {
				res.json("订阅成功");
			} else {
				res.status(403);
				next("订阅不成功");
			}
		})
		.then(null, err => {
			next(err);
		});
});

module.exports = router;