const mongoose = require("mongoose");
const User = require('./user');
const Course = require('./course');
const Member = require('./member');
const ObjectId = mongoose.Schema.Types.ObjectId;


let CoachSchema = mongoose.Schema({
    teachCourse :[{type: ObjectId,ref:'Course'}],
    teachMember : [{type: ObjectId,ref:'Member'}],
});

CoachSchema.set('toJSON', { virtuals: true })
/**
 * 教练教授课程
 * @param courseid
 */
CoachSchema.methods.selectCourse = function (courseid) {
    return new Promise((resolve, reject) => {
        Course.findOne({_id:courseid}).then(c => {
            c.teacher.push(this._id);
            this.teachCourse.push(c._id);
            c.save().then(res => {
                return this.save();
            }).then(res => {
                resolve(res);
            }).then(null, err => {
                reject(err);
            });
        }).then(null,err => {
            console.log(err);
            reject(err);
        })
    });
}

/**
 * 教练都是教哪些学员
 * @param memberid
 * @returns {Promise}
 */
CoachSchema.methods.selectMember = function (memberid) {
    return new Promise((resolve,reject)=>{
        Member.findOne({_id:memberid}).then(m =>{
            this.teachMember.push(m._id);
            this.save().then(member =>{
                resolve(member);
            })
        }).then(null,err=>{
            console.log(err);
            reject(err);
        });
    });
}

let Coach = User.discriminator("Coach", CoachSchema);

module.exports = Coach;