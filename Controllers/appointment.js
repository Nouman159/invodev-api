const Appointment = require('../Models/appointment')

const CreateAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.create(req.body)
        res.status(201).json({ responseCode: 201, status: "CREATED", message: "Appointment Added Successfully", appointment: appointment })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const SingleAppointment = async (req, res, next) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findById(id)
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "Appointment Fetched Successfully", appointment: appointment })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const AllAppointment = async (req, res, next) => {
    try {
        const appointments = await Appointment.find()
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "Appointments Fetched Successfully", appointments: appointments })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const UpdateAppointment = async (req, res, next) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true })
        res.status(202).json({ responseCode: 202, status: "UPDATED", message: "Appointment Updated Successfully", appointment: appointment })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


const DeleteAppointment = async (req, res, next) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findByIdAndDelete(id)
        res.status(202).json({ responseCode: 202, status: "DELETED", message: "Appointment Deleted Successfully", appointment: appointment })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

module.exports = {
    CreateAppointment,
    SingleAppointment,
    AllAppointment,
    UpdateAppointment,
    DeleteAppointment
}