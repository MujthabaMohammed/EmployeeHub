const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name:String,
    company:String,
    skillId:String,
	image:String

})

module.exports = mongoose.model('Employee',employeeSchema)
