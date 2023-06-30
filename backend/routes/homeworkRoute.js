const express = require('express')
const router = express.Router()
const { getHomework, postHomework, updateHomework, deleteHomework, sortedHomework  } = require('../controllers/homeworkController')
const protect = require('../middleware/authMiddleware')

router.get('/', protect, getHomework)

router.post('/', protect, postHomework)

router.put('/:id', protect, updateHomework)

router.delete('/:id', protect, deleteHomework)

router.get('/sorted', protect, sortedHomework)

module.exports = router
