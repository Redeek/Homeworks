const express = require('express')
const router = express.Router()
const { getSubject, postSubject, updateSubject, deleteSubject, sortedSubjects  } = require('../controllers/subjectController')
const protect = require('../middleware/authMiddleware')

router.get('/', getSubject)

router.post('/', postSubject)

router.put('/:id', updateSubject)

router.delete('/:id', deleteSubject)

router.get('/Sorted', sortedSubjects)

module.exports = router