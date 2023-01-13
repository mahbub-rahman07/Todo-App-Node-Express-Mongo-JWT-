const express = require('express')
const router = express.Router()
const {getTodos, setTodos, updateTodos, deleteTodos} = require('../controllers/getTodos')

router.route('/').get(getTodos).post(setTodos)

router.route('/:id').put(updateTodos).delete(deleteTodos)


module.exports = router