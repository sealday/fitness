const express = require('express');
let router = express.Router();

router.route('/')
	// 获取员工列表
	.get((req, res) => {
		res.json("get");
	})
	// 添加员工
	.post((req, res) => {
		res.json("post");
	})
	// 删除员工
	.delete((req, res) => {
		res.json("delete")
	})

// 具体员工路由
router.route('/:id')
	// 获取员工详情
	.get((req, res) => {
		res.json("get id");
	})
	// 获取更新某个员工资料
	.put((req, res) => {
		res.json("put id");
	});

module.exports = router;