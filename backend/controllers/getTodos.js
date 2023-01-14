const { text } = require('express')
const asyncHandler = require('express-async-handler')
const Todo = require('../model/todoModel')
const { use } = require('../routes/userRoute')
const User = require('../model/userModel')

// @desc Get Todos
// @route GET/api/todos
// @access Provate
const getTodos =  asyncHandler(async(req,res)=> {
    const todos = await Todo.find({use: req.user.id})
    res.status(200).json(todos)
})

// @desc Set Todos
// @route POST/api/todos
// @access Provate
const setTodos=  asyncHandler(async(req,res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text')
    }
    const todo = await Todo.create({
        text: req.body.text,
        user:req.user.id
    })
    console.log(req.body)
    res.status(200).json(todo)
})

// @desc Update Todos
// @route PUT/api/todos:id
// @access Provate
const updateTodos =  asyncHandler(async(req,res)=> {

    const todo = await Todo.findById(req.params.id)

    if(!todo){
        res.status(400)
        throw new Error('Todo not found!')
    }

    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found!')
    }

    if(todo.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized!')
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id, req.body.text, {new:true}
    )

    res.status(200).json(updatedTodo)
})

// @desc Delete Todos
// @route DELETE/api/todos:id
// @access Provate
const deleteTodos =  asyncHandler(async(req,res)=> {
    const todo = await Todo.findById(req.params.id)

    if(!todo){
        res.status(400)
        throw new Error('Todo not found!')
    }
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found!')
    }

    if(todo.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized!')
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