const mongoose = require('mongoose')

const testHistorySchema = new mongoose.Schema({
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
    test_date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: new Date().toISOString()
    }
})

const TestHistory = mongoose.model('TestHistory', testHistorySchema)
module.exports = TestHistory