const express = require('express');
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

module.exports = router;