const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date().toISOString()
    }
})

const Doctor = mongoose.model('Doctor', doctorSchema)
module.exports = Doctor