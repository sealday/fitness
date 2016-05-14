const express = require('express');
let router = express.Router();

router.route('/')
	// 获取会员列表
	.get((req, res) => {
		res.json("get");
	})
	// 添加会员
	.post((req, res) => {
		res.json("post");
	})
	// 删除会员
	.delete((req, res) => {
		res.json("delete")
	})

// 具体会员路由
router.route('/:id')
	// 获取会员详情
	.get((req, res) => {
		res.json("get id");
	})
	// 获取更新某个会员资料
	.put((req, res) => {
		res.json("put id");
	});

module.exports = router;