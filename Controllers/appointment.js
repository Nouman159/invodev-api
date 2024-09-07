// const Appointment = require('../Models/appointment')

// const CreateAppointment = async (req, res, next) => {
//     try {
//         const appointment = await Appointment.create(req.body)
//         res.status(201).json({ responseCode: 201, status: "CREATED", message: "Appointment Added Successfully", appointment: appointment })
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500
//         }
//         next(error)
//     }
// }

const Appointment = require('../Models/appointment')
const Doctor = require('../Models/doctor') // Assuming you have a Doctor model
const nodemailer = require('nodemailer') // For sending email

const CreateAppointment = async (req, res, next) => {
    try {
        // Create an appointment
        const appointment = await Appointment.create(req.body)
        appointmentDetails = await Appointment.findById(appointment._id).populate('doctor').populate('patient').exec();
        console.log(appointmentDetails)
        // appointment = {
        // appointment
        // }

        // Populate doctor information to get the doctor's email
        const populatedAppointment = await Appointment.findById(appointment._id).populate('doctor', 'email').exec();
        const doctorEmail = populatedAppointment.doctor.email
        console.log(doctorEmail)

        // Configure nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noumanarshad15926@gmail.com', // Your email
                pass: 'gvnw phuy rzxw jwqw'
            }
        })

        // Setup email data
        const mailOptions = {
            from: 'noumanarshad15926@gmail.com',
            to: doctorEmail,
            subject: 'New Appointment Request',
            text: `
            An appointment has been requested with the following details:

            Appointment ID: ${appointmentDetails._id}
            Requested Date: ${appointmentDetails.appointment_date}
            Doctor: ${appointmentDetails.doctor.email}
            
            Patient Details:
            Name: ${appointmentDetails.patient.name}
            Email: ${appointmentDetails.patient.email}
            Age: ${appointmentDetails.patient.age}

            For more details, please check the appointment record.
        `
        }

        // Send email to the doctor
        await transporter.sendMail(mailOptions)

        res.status(201).json({
            responseCode: 201,
            status: "CREATED",
            message: "Appointment Added Successfully and Email Sent to Doctor",
            appointment: appointment
        })
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

const PatientAppointment = async (req, res, next) => {
    try {
        const { id } = req.params
        const appointments = await Appointment.find({ patient: id, status: 'approved' }).populate('doctor')
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "Patients Appointments Fetched Successfully", appointments: appointments })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const DoctorAppointment = async (req, res, next) => {
    try {
        const { id } = req.params
        const appointments = await Appointment.find({ doctor: id, status: 'pending' }).populate('patient')
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "Doctor Appointments Fetched Successfully", appointments: appointments })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const DoctorAppointmentApproved = async (req, res, next) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findById(id)
        appointment.status = 'approved'
        await appointment.save()
        res.status(200).json({ responseCode: 200, status: "APPROVED", message: "Appointment Approved", appointment: appointment })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const DoctorAppointmentRejected = async (req, res, next) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findById(id)
        appointment.status = 'rejected'
        await appointment.save()
        res.status(200).json({ responseCode: 200, status: "REJECTED", message: "Appointment Rejected", appointment: appointment })
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
    DeleteAppointment,
    PatientAppointment,
    DoctorAppointment,
    DoctorAppointmentApproved,
    DoctorAppointmentRejected
}