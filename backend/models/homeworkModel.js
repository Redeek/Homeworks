const mongoose = require('mongoose')

const homeworkSchema = mongoose.Schema({
    subject:{
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'subjects'
    },
    text:{
        type: String,
        required: [true, 'add a text']
    }
    },
    {
        timestamps: true
    }
)

const homeworkModel = mongoose.model('homeworks', homeworkSchema)
module.exports = homeworkModel