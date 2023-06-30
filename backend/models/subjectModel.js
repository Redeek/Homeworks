const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'add a subject'],
        unique: true
    },
    }
    
)

const subjectModel = mongoose.model('subjects', subjectSchema)
module.exports = subjectModel