const router = require('express').Router()
const Appointment = require('../Controllers/appointment')

router.post('/create', Appointment.CreateAppointment)
router.get('/all', Appointment.AllAppointment)
router.get('/single/:id', Appointment.SingleAppointment)
router.get('/patients/all/:id', Appointment.PatientAppointment)
router.get('/doctors/all/:id', Appointment.DoctorAppointment)
router.get('/doctor/approved/:id', Appointment.DoctorAppointmentApproved)
router.get('/doctor/rejected/:id', Appointment.DoctorAppointmentRejected)
// router.put('/update/:id', Appointment.UpdateAppointment)
// router.delete('/delete/:id', Appointment.DeleteAppointment)

module.exports = router