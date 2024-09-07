const router = require('express').Router()
const TestHistory = require('../Controllers/testHistory')

router.post('/create', TestHistory.CreateTestHistory)
router.get('/all', TestHistory.AllTestHistory)
router.get('/single/:id', TestHistory.SingleTestHistory)
// router.put('/update/:id', TestHistory.UpdateTestHistory)
// router.delete('/delete/:id', TestHistory.DeleteTestHistory)

module.exports = router