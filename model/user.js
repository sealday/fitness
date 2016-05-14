const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
// 错误类型
const et = require('../common/error').type;
// 错误对象工厂方法
const ef = require('../common/error').factory;

let UserSchema = new mongoose.Schema({
	username: { type: String, index: true, unique: true, required: true },
	password: { type: String, required: true },
	name: { type: String, default: '小萌新' },
	phone: String
}, {
	timestamps: true
});

UserSchema.pre('save', function(next) {
	const hashRound = 10;
	bcrypt.hash(this.password, hashRound, (err, res) => {
			// 这里的 err 怎么处理
			// 这里的 err 有可能是什么呢？
			this.password = res;
			next();
		});
});

UserSchema.methods.findUser = function(username, password) {
	return new Promise((resolve, reject) => {
		this.model('User').findOne({username}).then(user => {
			if (user == null) {
				return reject(ef("账号没有找到", et.USER));
			} 
			bcrypt.compare(password, u.password, (err, matched) => {
				if (err) {
					return reject(ef(err));
				} 
				if (matched) {
					resolve(user);
				} else {
					reject(ef("密码错误", ef.USER));
				}
			});
		}).then(null, e => {
			reject(ef(e));
		});
	});
}

let User = mongoose.model('User', UserSchema);

module.exports = User;