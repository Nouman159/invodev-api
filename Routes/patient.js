const router = require('express').Router()
const Patient = require('../Controllers/patient')

router.post('/create', Patient.CreatePatient)
router.post('/signin', Patient.SignInPatient)
router.get('/all', Patient.AllPatient)
router.get('/single/:id', Patient.SinglePatient)
// router.put('/update/:id', Patient.UpdatePatient)
// router.delete('/delete/:id', Patient.DeletePatient)

module.exports = router