const router = require('express').Router()
const Doctor = require('../Controllers/doctor')

router.post('/create', Doctor.CreateDoctor)
router.post('/signin', Doctor.SignInDoctor)
router.get('/all', Doctor.AllDoctor)
router.get('/single/:id', Doctor.SingleDoctor)
// router.put('/update/:id', Doctor.UpdateDoctor)
// router.delete('/delete/:id', Doctor.DeleteDoctor)

module.exports = router