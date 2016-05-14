
module.exports = {
	type: {
		SYSTEM: "系统错误", 
		USER: "用户错误"
	},
	factory: (error, type = "系统错误") => {
		return {type, error}
	}
}