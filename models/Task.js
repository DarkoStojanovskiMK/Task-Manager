const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        required:[true, 'must provide name'],
        trim: true
    }
})

module.exports = mongoose.model('Task', TaskSchema)