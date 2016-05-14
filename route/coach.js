const express = require('express');
let router = express.Router();

router.route('/')
	// 获取教练列表
	.get((req, res) => {
		res.json("get");
	})
	// 添教练加
	.post((req, res) => {
		res.json("post");
	})
	// 删教练除
	.delete((req, res) => {
		res.json("delete")
	})

// 具体教练路由
router.route('/:id')
	// 获取教练详情
	.get((req, res) => {
		res.json("get id");
	})
	// 获取更新某个教练资料
	.put((req, res) => {
		res.json("put id");
	});

module.exports = router;