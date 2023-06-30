const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'add a name']
    },
    surname:{
        type: String,
        required: [true, 'add a surname']
    },
    email:{
        type: String,
        required: [true, 'add a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'add a password'],
    },
    type:{
        type: String,
        required: [true, 'add a type of account'],
    }
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel