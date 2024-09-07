const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    appointment_date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },

    date: {
        type: Date,
        default: new Date().toISOString()
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment