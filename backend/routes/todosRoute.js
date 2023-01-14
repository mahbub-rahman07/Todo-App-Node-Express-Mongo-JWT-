const express = require('express')
const router = express.Router()
const {getTodos, setTodos, updateTodos, deleteTodos} = require('../controllers/getTodos')

const {protect} = require('../middleware/authMiddleware')

// @desc todos routes
router.route('/').get(protect,getTodos).post(protect,setTodos)
router.route('/:id').put(protect,updateTodos).delete(protect,deleteTodos)


module.exports = router