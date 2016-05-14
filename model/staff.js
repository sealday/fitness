const mongoose = require("mongoose");
const User = require('./user');

let StaffSchema = new mongoose.Schema({
	
});

let Staff = User.discriminator('Staff', StaffSchema);

module.exports = Staff;