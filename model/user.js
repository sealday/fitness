const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const secret = 'xinerseal';

// 错误类型
const et = require('../common/error').type;
// 错误对象工厂方法
const ef = require('../common/error').factory;

let UserSchema = new mongoose.Schema({
	username: { type: String, index: true, unique: true, required: true },
	idCard: { type: String, index: true, unique: true },
	phone: { type: String, index: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, default: '小萌新' },
	sex: String,
	token: { type: String, index: true }
}, {
	timestamps: true
});

UserSchema.methods.addUser = function(username, rawPassword) {
	return new Promise((resolve, reject) => {
		const hashRound = 10;
		bcrypt.hash(rawPassword, hashRound, (err, password) => {
			if (err) {
				reject(ef(err));
			} else {
				let user = new User({username, password});
				user.save()
					.then(u => {
						resolve(u);
					})
					.then(null, err => {
						reject(err);
					});
			}
		});
	});
}


UserSchema.methods.findUser = function(username, password) {
	return new Promise((resolve, reject) => {
		this.model('User').findOne({username}).then(user => {
			if (user == null) {
				return reject(ef("账号没有找到", et.USER));
			} 
			bcrypt.compare(password, user.password, (err, matched) => {
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

UserSchema.methods.findUserByToken = function(token) {
	return new Promise((resolve, reject) => {
		this.model('User').findOne({token}).then(user => {
			if (user == null) {
				return reject(ef("token已过期", et.USER));
			} 
			resolve(user);
		}).then(null, err => {
			reject(ef(err));
		})
	});
}

UserSchema.methods.login = function(username, password) {
	return new Promise((resolve, reject) => {
		this.model('User')
			.findUser()
			.then(user => {
				user.token = crypto
								.createHmac('sha256', secret)
								.update(`${user._id}${new Date()}${user.username}${Math.random()}`)
								.digest('hex');
				user.save()
					.then(res => {

					})
					.then(null, err => {
						reject(ef(e));
					});
			})
			.then(null, err => {
				reject(err);
			});
	});
}

let User = mongoose.model('User', UserSchema);

module.exports = User;