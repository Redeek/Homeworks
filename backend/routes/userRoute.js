const express = require('express')
const router = express.Router()
const { registerUser, loginUser, meUser } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

router.post('/', registerUser) //register

router.post('/login', loginUser) // login


router.get('/me',protect, meUser )

module.exports = router
