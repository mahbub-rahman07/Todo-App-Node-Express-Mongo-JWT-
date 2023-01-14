const express = require('express')
const router = express.Router()
const {getUser, registration, login} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.get('/me', protect, getUser)
router.post('/registration',registration)
router.post('/login', login)



module.exports = router