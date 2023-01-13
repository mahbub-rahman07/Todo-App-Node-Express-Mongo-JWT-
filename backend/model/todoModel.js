const mongoose = require('mongoose')
const todoSchema = mongoose.Schema({
    text: {
        type:String,
         required: [true, 'Please add a text']
    }
},{
    timestamps: true
}
)
module.exports = mongoose.model('Todo', todoSchema)