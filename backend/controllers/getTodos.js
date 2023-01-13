const { text } = require('express')
const asyncHandler = require('express-async-handler')
const Todo = require('../model/todoModel')

// @desc Get Goals
// @route GET/api/goals
// @access Provate
const getTodos =  asyncHandler(async(req,res)=> {
    const todos = await Todo.find()
    res.status(200).json(todos)
})

// @desc Set Goals
// @route POST/api/goals
// @access Provate
const setTodos=  asyncHandler(async(req,res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text')
    }
    const todo = await Todo.create({
        text: req.body.text
    })
    console.log(req.body)
    res.status(200).json(todo)
})

// @desc Update Goals
// @route PUT/api/goals:id
// @access Provate
const updateTodos =  asyncHandler(async(req,res)=> {

    const todo = await Todo.findById(req.params.id)

    if(!todo){
        res.status(400)
        throw new Error('Todo not found!')
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id, req.body, {new:true}
    )

    res.status(200).json(updateGoals)
})

// @desc Delete Goals
// @route DELETE/api/goals:id
// @access Provate
const deleteTodos =  asyncHandler(async(req,res)=> {
    const todo = await Todo.findById(req.params.id)

    if(!todo){
        res.status(400)
        throw new Error('Todo not found!')
    }
    todo.remove()

    res.status(200).json(todo)
})


module.exports = {
    getTodos,
    setTodos,
    updateTodos,
    deleteTodos
}