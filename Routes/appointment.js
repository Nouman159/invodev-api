const router = require('express').Router()
const Appointment = require('../Controllers/appointment')

router.post('/create', Appointment.CreateAppointment)
router.get('/all', Appointment.AllAppointment)
router.get('/single/:id', Appointment.SingleAppointment)
// router.put('/update/:id', Appointment.UpdateAppointment)
// router.delete('/delete/:id', Appointment.DeleteAppointment)

module.exports = router