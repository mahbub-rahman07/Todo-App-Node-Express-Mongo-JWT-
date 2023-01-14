const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const colors = require('colors')

const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)

console.log( process.env.PORT)

app.use('/api/users', require('./routes/userRoute'))
app.use('/api/todos', require('./routes/todosRoute'))

app.listen(port, ()=> console.log(`server started on port ${port}`))